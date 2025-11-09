import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { PORT } from "./config/config";
import aiRouter from "./routes/ai";
import authRouter from "./routes/auth";
import billingRouter from "./routes/billing";
import { PrismaClient } from "./generated/prisma";
export const prisma = new PrismaClient({
  log: ["info", "error"],
});
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL || "http://localhost:3001"],
    credentials: true,
  }),
);

app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/billing", billingRouter);
app.use("/api/health-check", (req, res) => {
  res.status(200).json({ message: "server is healthy" });
});

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`SERVER IS RUNNING AT PORT || ${PORT}`);
});
