import express from "express";
import { PORT } from "./config";
import { createChatSchema } from "./types";
import { createCompletion } from "./openRouter";
import { InMemoryStore } from "./inMemoryStore";

const app = express();
app.use(express.json());


app.post('/chat', async (req, res) => {
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

    res.setHeader('Content-Type', 'text/event-stream: charset=utf-8');
    res.setHeader('Connection', 'keep-alive');
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

})


app.listen(PORT, () => {
    console.log(`SERVER IS RUNNING AT PORT || ${PORT}`)
})