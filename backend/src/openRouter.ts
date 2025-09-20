import { OPENROUTER_API_KEY } from "./config";
import type { Message, Messages, MODEL } from "./types";

const MAX_TOKEN_ITERATIONS = 1000;


export const createCompletion = async (
    messages: Messages,
    model: MODEL,
    cb: (chunk: string) => void
) => {
    return new Promise<void>(async (resolve, reject) => {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${OPENROUTER_API_KEY}`,
                'HTTP-Referer': '<YOUR_SITE_URL>', // Optional. Site URL for rankings on openrouter.ai.
                'X-Title': '<YOUR_SITE_NAME>', // Optional. Site title for rankings on openrouter.ai.
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model,
                messages,
                stream: true
            }),
        });

        const reader = response.body?.getReader();

        if (!reader) {
            throw new Error('Response body is not readable');
        }

        const decoder = new TextDecoder();
        let buffer = '';

        try {
            let tokenIteration = 0;
            while (true) {
                const { done, value } = await reader.read();
                if (tokenIteration > MAX_TOKEN_ITERATIONS) {
                    resolve()
                    return;
                };

                // Append new chunk to buffer
                buffer += decoder.decode(value, { stream: true });

                // Process complete lines from buffer
                while (true) {
                    const lineEnd = buffer.indexOf('\n');

                    if (lineEnd === -1) {
                        resolve()
                        break;
                    };

                    const line = buffer.slice(0, lineEnd).trim();
                    buffer = buffer.slice(lineEnd + 1);

                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);

                        if (data === '[DONE]') break;
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0].delta.content;
                            if (content) {
                                cb(content);
                            }
                        } catch (e) {
                            // Ignore invalid JSON
                            reject()
                        }
                    }
                }
            }
        } finally {
            reader.cancel();
        }
    })
}
