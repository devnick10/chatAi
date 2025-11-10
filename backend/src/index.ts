import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import { prisma } from "./config/db";
import { FRONTEND_URL, PORT } from "./config/config";
import aiRouter from "./routes/ai";
import authRouter from "./routes/auth";
import billingRouter from "./routes/billing";
import healCheckRoute from "./routes/healthCheack";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import hpp from "hpp";

const app = express();

// Global rate limiting
const limiter = rateLimit({
windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
}) 

// Security Middlewares
app.use(helmet());
app.use("/api",limiter)
app.use(hpp());

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(
  cors({
    origin: [FRONTEND_URL || "http://localhost:3001"],
    credentials: true,
  }),
);

// API Routes
app.use("/api/v1/ai", aiRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/billing", billingRouter);

// health-check route
app.use("/health-check",healCheckRoute);

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`SERVER IS RUNNING AT PORT || ${PORT}`);
});
