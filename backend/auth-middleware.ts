import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authToken = req.headers.authorization?.split(" ")[1]

    if (!authToken) {
        res.status(403).json({
            message: "Auth token required",
            success: false
        })
        return
    }

    try {
        const data = jwt.verify(authToken, process.env.JWT_SECRET!) as JwtPayload;
        req.userId = data.userId;
        next();
    } catch (e) {
        res.status(403).json({
            message: "Auth token invalid!",
            success: false
        });
    }
}