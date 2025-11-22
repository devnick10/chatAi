import { Router } from "express";
import { CreateUser, SignIn } from "../types";
import { sendMail } from "../config/postMark";
import jwt from "jsonwebtoken";
import { TOTP } from "totp-generator";
import base32 from "hi-base32";
import { prisma } from "../config/db";
import { JWT_SECRET, NODE_ENV } from "../config/config";
import { ApiError } from "../middlewares/errorMiddleware";
import { catchAsync } from "../utils/catchAsync";
const authRouter = Router();

authRouter.post(
  "/initiate_signin",
  catchAsync(async (req, res) => {
    const { success, data } = CreateUser.safeParse(req.body);
    if (!success) {
      throw new ApiError(411, "Invalid inputs");
    }

    const { otp } = await TOTP.generate(base32.encode(data.email + JWT_SECRET));

    if (NODE_ENV !== "development") {
      await sendMail(
        data.email,
        "Login to 1ai",
        `Login into 1ai your otp is ${otp}`,
      );
    } else {
      console.log("Log into your 1ai " + otp);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      res.status(200).json({
        message: "Check your email",
        success: true,
      });
      return;
    }

    await prisma.user.create({
      data: {
        email: data.email,
      },
    });

    res.status(201).json({
      message: "Check your email",
      success: true,
    });
  }),
);

authRouter.post(
  "/signin",
  catchAsync(async (req, res) => {
    const { success, data } = SignIn.safeParse(req.body);
    if (!success) {
      throw new ApiError(411, "Invalid inputs");
    }

    // verify otp
    const { otp } = await TOTP.generate(base32.encode(data.email + JWT_SECRET));
    if (data.otp !== otp) {
      res.status(401).json({
        message: "Invalid OTP",
        success: false,
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (!user) {
      throw new ApiError(401, "User not found");
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({
      token,
      success: true,
    });
  }),
);

authRouter.get(
  "/me",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new ApiError(401, "User not found");
    }
    res.status(200).json({
      user,
      success: true,
    });
  }),
);

export default authRouter;
