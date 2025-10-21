import { Router } from "express";
import { CreateUser, SignIn } from "../types";
import { sendMail } from "../../postMark";
import jwt from "jsonwebtoken";
import { TOTP } from "totp-generator";
import base32 from 'hi-base32';
import { prisma } from "..";
const authRouter = Router();


authRouter.post('/initiate_signin', async (req, res) => {
    try {
        const { success, data } = CreateUser.safeParse(req.body);
        if (!success) {
            res.status(411).json({
                message: "Invalid inputs",
                success: false
            })
            return;
        }

        const { otp } = await TOTP.generate(base32.encode(data.email + process.env.JWT_SECRET));

        if (process.env.NODE_ENV !== "development") {
            await sendMail(data.email, "Login to 1ai", `Login into 1ai your otp is ${otp}`);
        } else {
            console.log('Log into your 1ai ' + otp)
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email: data.email
                }
            })
            if (user) {
                res.status(200).json({
                    message: "Check your email",
                    success: true
                })
                return;
            }
            await prisma.user.create({
                data: {
                    email: data.email
                }
            })
        } catch (e) {
            console.error("Internal server error", e);
        }

        res.status(201).json({
            message: "Check your email",
            success: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

authRouter.post('/signin', async (req, res) => {
    const { success, data } = SignIn.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            message: "Invalid inputs",
            success: false
        })
        return;
    }

    // verify otp 
    const { otp } = await TOTP.generate(base32.encode(data.email + process.env.JWT_SECRET));

    if (data.otp !== otp) {
        res.status(401).json({
            message: "Invalid OTP",
            success: false
        })
        return
    }

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: data.email
            }
        })

        if (!user) {
            res.status(401).json({
                message: "User not found",
                success: false
            })
            return
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)

        res.status(200).json({
            token,
            success: true
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})

authRouter.get('/me', async (req, res) => {
    const userId = req.userId;
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })
        if (!user) {
            res.status(401).json({
                message: "User not found",
                success: false
            })
            return
        }
        res.status(200).json({
            user,
            success: true
        })
        return
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
})


export default authRouter;