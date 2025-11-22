import type { NextFunction, Request, Response } from "express";
import { NODE_ENV } from "../config/config";

export interface AppError extends Error {
  statusCode?: number;
  status?: string;
  code?: string; // Prisma error code
  meta?: any; // Prisma metadata
  errors?: any; // Zod errors
}

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal server error";

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid or malformed token";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired. Please login again.";
  }

  // Production: hide internal details
  if (NODE_ENV === "production") {
    return res.status(statusCode).json({
      success: false,
      message,
    });
  }

  // Development: show full error
  return res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack,
    error: err,
  });
};

export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    statusCode: number = 500,
    message: string = "Internal Server Error",
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = true;

    // Set correct prototype (important for TS)
    Object.setPrototypeOf(this, new.target.prototype);

    // Capture stack trace (optional but recommended)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
