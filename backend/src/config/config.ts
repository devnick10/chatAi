import dotenv from "dotenv";
dotenv.config();

const _config = {
  OPENROUTER_API_KEY: process.env.OPENROUTER_KEY || "dd",
  POSTMARK_SERVER_TOKEN: process.env.POSTMARK_SERVER_TOKEN || "",
  FROM_EMAIL: process.env.FROM_EMAIL || "",
  PORT: process.env.PORT || "3000",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "klfkdsj",
  DATABASE_URL: process.env.DATABASE_URL || "",
  RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || "",
  RAZORPAY_KEY_SECRET: process.env.RAZORPAY_KEY_SECRET || "",
  RAZORPAY_PLAN_ID: process.env.RAZORPAY_PLAN_ID || "",
  RAZORPAY_ENVIRONMENT: process.env.RAZORPAY_ENVIRONMENT || "test",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:3001",
};

export const {
  PORT,
  JWT_SECRET,
  NODE_ENV,
  OPENROUTER_API_KEY,
  POSTMARK_SERVER_TOKEN,
  FROM_EMAIL,
  DATABASE_URL,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_PLAN_ID,
  RAZORPAY_ENVIRONMENT,
  FRONTEND_URL,
} = Object.freeze(_config);
