import { Router } from "express";
import { createChatSchema, type Message, type Role } from "../types";
import { InMemoryStore } from "../inMemoryStore";
import { createCompletion } from "../openRouter";
import { authMiddleware } from "../../auth-middleware";
import { PrismaClient } from "../generated/prisma";
const router = Router();
const prismaClient = new PrismaClient();

router.get('/conversations', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const conversations = await prismaClient.conversation.findFirst({
        where: {
            userId
        },
    })
    res.json({
        conversations
    })
})

router.get('/conversation/conversationId', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const conversationId = req.params.conversationId;
    const conversation = await prismaClient.conversation.findFirst({
        where: {
            id: conversationId,
            userId
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        }
    })
    res.json({
        conversation
    })
})


router.post('/chat', authMiddleware, async (req, res) => {
    const userId = req.userId;
    const { success, data } = createChatSchema.safeParse(req.body);
    const conversationId = data?.conversationId ?? Bun.randomUUIDv7();

    if (!success) {
        res.status(411).json({
            messsage: "Incorrect inputs",
            status: false
        })
        return
    }

    let existingMessages = InMemoryStore.getInstance().get(conversationId)

    if (!existingMessages.length) {
        const messages = await prismaClient.message.findMany({
            where: {
                conversationId
            }
        })
        messages.map((message) => {
            InMemoryStore.getInstance().add(conversationId, {
                role: message.role as Role,
                content: message.content
            })
        })
    }

    res.setHeader('Cache', 'no-cache');
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();

    let message = "";

    await createCompletion([...existingMessages, {
        role: "user",
        content: data.message
    }], data.model, (chunk: string) => {
        message += chunk
        res.write(chunk);
    })
    res.end();

    InMemoryStore.getInstance().add(conversationId, {
        role: "user",
        content: data.message
    })

    InMemoryStore.getInstance().add(conversationId, {
        role: "assistent",
        content: message
    })

    if (!data.conversationId) {
        await prismaClient.conversation.create({
            data: {
                id: conversationId,
                title: data.message.slice(0, 20) + '...',
                userId,
            }
        })
    }
    await prismaClient.message.createMany({
        data: [
            {
                conversationId,
                role: "user",
                content: data.message
            },
            {
                conversationId,
                role: "agent",
                content: message
            }
        ]
    })
})
export default router;