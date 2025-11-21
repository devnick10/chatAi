import { Router } from "express";
import { prisma } from "../config/db";
import { InMemoryStore } from "../config/inMemoryStore";
import { createCompletion } from "../config/openRouter";
import { createChatSchema, type Role } from "../types";
const router = Router();

router.get("/conversations", async (req, res) => {
  const userId = req.userId;
  const conversations = await prisma.conversation.findFirst({
    where: {
      userId,
    },
  });
  res.json({
    conversations,
  });
});

router.get("/conversation/conversationId", async (req, res) => {
  const userId = req.userId;
  // @ts-expect-error req.params.conversationId maybe empty or cause error;
  const conversationId = req.params.conversationId;
  const conversation = await prisma.conversation.findFirst({
    where: {
      id: conversationId,
      userId,
    },
    include: {
      messages: {
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });
  res.json({
    conversation,
  });
});

router.post("/chat", async (req, res) => {
  const userId = req.userId;
  const { success, data } = createChatSchema.safeParse(req.body);
  const conversationId = data?.conversationId ?? Bun.randomUUIDv7();

  if (!success) {
    res.status(411).json({
      messsage: "Incorrect inputs",
      status: false,
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(404).json({
      messsage: "user not found",
      status: false,
    });
    return;
  }

  if (user.credits <= 0) {
    res.status(403).json({
      messsage: "Insufficient credits. Please subscribe to continue.",
      status: false,
    });
    return;
  }

  let existingMessages = InMemoryStore.getInstance().get(conversationId);

  if (!existingMessages.length) {
    const messages = await prisma.message.findMany({
      where: {
        conversationId,
      },
    });
    messages.map((message) => {
      InMemoryStore.getInstance().add(conversationId, {
        role: message.role as Role,
        content: message.content,
      });
    });
  }

  res.setHeader("Cache", "no-cache");
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Cache-Control", "no-store");
  res.flushHeaders();

  let message = "";

  try {
    await createCompletion(
      [
        ...existingMessages,
        {
          role: "user",
          content: data.message,
        },
      ],
      (chunk: string) => {
        message += chunk;
        res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      },
    );
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
  } catch (error) {
    console.error("Error in completion:", error);
    res.write(
      `data: ${JSON.stringify({ error: "Failed to generate response" })}\n\n`,
    );
  } finally {
    res.end();
  }

  InMemoryStore.getInstance().add(conversationId, {
    role: "user",
    content: data.message,
  });

  InMemoryStore.getInstance().add(conversationId, {
    role: "assistent",
    content: message,
  });

  if (!data.conversationId) {
    await prisma.conversation.create({
      data: {
        id: conversationId,
        title: data.message.slice(0, 20) + "...",
        userId,
      },
    });
  }

  await prisma.$transaction([
    prisma.message.createMany({
      data: [
        {
          conversationId,
          role: "user",
          content: data.message,
        },
        {
          conversationId,
          role: "agent",
          content: message,
        },
      ],
    }),
  ]);
  prisma.user.update({
    where: { id: userId },
    data: {
      credits: {
        decrement: 1,
      },
    },
  });
});

router.get("/credits", async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        message: "user not found",
        status: false,
      });
    }

    res.json({
      credits: user.credits,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.error("Error fetching user credits:", error);
    res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
});

export default router;
