import { email, number, z } from "zod"
const MAX_INPUTS_TOKENS = 1000;
const SUPPORTER_MODELS = ['openai/gpt-4o', 'openai/gpt-5']
const CURRENCY = ['INR']
export type MODEL = typeof SUPPORTER_MODELS[number]

export const createChatSchema = z.object({
    conversationId: z.uuid().optional(),
    message: z.string().max(MAX_INPUTS_TOKENS),
    model: z.enum(SUPPORTER_MODELS)
})

export const CreateUser = z.object({
    email: z.email()
})

export const SignIn = z.object({
    email: z.email(),
    otp:z.string()
})

export const checkout = z.object({
    amount:z.string(),
    currency:z.enum(CURRENCY).optional(),
})

export const paymentVerify = z.object({
    razorpay_order_id:z.string(),
    razorpay_payment_id:z.string(),
    razorpay_signature:z.string(),
})


export type Role = "assistent" | "user"
export type Message = {
    role: Role;
    content: string
}
export type Messages = Message[]
