import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { FRONTEND_URL, NODE_ENV, PORT } from "./config/config";
import { prisma } from "./config/db";
import { authMiddleware } from "./middlewares/auth-middleware";
import aiRouter from "./routes/ai";
import authRouter from "./routes/auth";
import billingRouter from "./routes/billing";
import healCheckRoute from "./routes/healthCheack";

const app = express();

// Global rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
})

// Security Middlewares
app.use(helmet());
app.use("/api", limiter)
app.use(hpp());

// Dev logger
if (NODE_ENV === "development") {
  app.use(morgan("dev"))
}

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [FRONTEND_URL],
    credentials: true,
  }),
);

// API Routes
app.use("/api/v1/ai", authMiddleware, aiRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/billing", authMiddleware, billingRouter);

// health-check route
app.use("/health-check", healCheckRoute);

app.listen(PORT, async () => {
  await prisma.$connect();
  console.log(`SERVER IS RUNNING AT PORT || ${PORT}`);
});