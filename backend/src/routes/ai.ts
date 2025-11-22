import { Router } from "express";
import { prisma } from "../config/db";
import { InMemoryStore } from "../config/inMemoryStore";
import { createCompletion } from "../config/openRouter";
import { createChatSchema, type Role } from "../types";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../middlewares/errorMiddleware";
const router = Router();

router.get(
  "/conversations",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const conversations = await prisma.conversation.findFirst({
      where: {
        userId,
      },
    });
    res.json({
      conversations,
    });
  }),
);

router.get(
  "/conversation/conversationId",
  catchAsync(async (req, res) => {
    const userId = req.userId;
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
  }),
);

router.post(
  "/chat",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const { success, data } = createChatSchema.safeParse(req.body);
    const conversationId = data?.conversationId ?? Bun.randomUUIDv7();

    if (!success) {
      throw new ApiError(411, "Incorrect inputs");
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new ApiError(411, "user not found");
    }

    if (user.credits <= 0) {
      throw new ApiError(
        403,
        "Insufficient credits. Please subscribe to continue.",
      );
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

    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "no-cache, no-store, must-revalidate, no-transform",
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.flushHeaders();

    let message = "";

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
    res.end();

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
    await prisma.user.update({
      where: { id: userId },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });
  }),
);

router.get(
  "/credits",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ApiError(404, "User not found.");
    }
    res.json({
      credits: user.credits,
      isPremium: user.isPremium,
    });
  }),
);

export default router;
