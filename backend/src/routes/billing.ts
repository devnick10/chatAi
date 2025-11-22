import axios from "axios";
import crypto from "crypto";
import { Router } from "express";
import {
  FRONTEND_URL,
  RAZORPAY_ENVIRONMENT,
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_PLAN_ID,
} from "../config/config";
import { prisma } from "../config/db";
import { catchAsync } from "../utils/catchAsync";
import { ApiError } from "../middlewares/errorMiddleware";
const router = Router();

const razorpayCredentials = {
  key: RAZORPAY_KEY_ID,
  secret: RAZORPAY_KEY_SECRET,
  plan_id: RAZORPAY_PLAN_ID,
  environment: RAZORPAY_ENVIRONMENT,
};

const subscriptionUrl =
  razorpayCredentials.environment === "sandbox"
    ? "https://api.razorpay.com/v1/subscriptions"
    : "https://api.razorpay.com/v1/subscriptions";

const plans = [
  {
    name: "Premium",
    monthly_price: 499,
    plan_id: razorpayCredentials.plan_id,
    annual_price: 4999,
    currency: "INR",
    symbol: "₹",
    pricing_currency: [
      {
        plan_Id: razorpayCredentials.plan_id,
        annual_price: 4999,
        monthly_price: 499,
        currency: "INR",
        symbol: "₹",
      },
    ],
  },
];

function verifyRazorpaySignature(
  subscriptionId: string,
  paymentId: string,
  signature: string,
) {
  try {
    const body = subscriptionId + "|" + paymentId;
    const expectedsignature = crypto
      .createHmac("sha256", RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    return expectedsignature === signature;
  } catch (error) {
    console.error("Signature verification failed: ", error);
    return false;
  }
}

// create a subscription
router.get(
  "/init-subscribe",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const authHeader =
      "Basic " +
      Buffer.from(
        razorpayCredentials.key + ":" + razorpayCredentials.secret,
      ).toString("base64");
    const headers = {
      Authorization: authHeader,
      "Content-Type": "application/json",
    };

    let wp = plans[0]?.pricing_currency[0]!;

    const orderData = {
      plan_id: wp?.plan_Id,
      customer_notify: 1,
      total_count: 12,
      notes: {
        customer_id: userId,
        return_url: `${FRONTEND_URL}`,
      },
    };

    // creat a subscription
    const subscritions = await axios.post(subscriptionUrl, orderData, {
      headers,
    });
    const { id } = subscritions.data;

    if (!id) {
      throw new ApiError(500, "Missing payment session ID");
    }

    const paymentHistory = await prisma.paymentHistory.create({
      data: {
        status: "pending",
        paymentMethod: "RAZORPAY",
        cfPaymentId: "",
        bankReference: id,
        amount: wp.monthly_price,
        userId,
        currency: wp.currency,
      },
    });

    if (!paymentHistory) {
      throw new ApiError(500, "Error creating order");
    }
    return res.json({ subscriptionId: id, rzpKey: razorpayCredentials.key });
  }),
);

router.post(
  "/subscribe",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const { subscriptionId, paymentId, signature } = req.body;

    const existingPayment = await prisma.paymentHistory.findFirst({
      where: {
        bankReference: subscriptionId,
        userId,
      },
    });

    if (!existingPayment) {
      throw new ApiError(500, "Invalid session ID");
    }

    if (!verifyRazorpaySignature(subscriptionId, paymentId, signature)) {
      throw new ApiError(500, "Invalid signature");
    }

    await prisma.paymentHistory.update({
      where: {
        paymentId: existingPayment.paymentId,
      },
      data: {
        cfPaymentId: paymentId,
        status: "success",
      },
    });

    const creditsTOGrant = 100;
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        isPremium: true,
        credits: {
          increment: creditsTOGrant,
        },
      },
    });

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + 1); // add 1 month

    const subscription = await prisma.subscription.create({
      data: {
        userId,
        currency: existingPayment.currency ?? "",
        planId: existingPayment.bankReference ?? "",
        subscriptionId: existingPayment.cfPaymentId ?? "",
        startDate,
        endDate,
        creditsGranted: creditsTOGrant,
      },
    });
    if (!subscription) {
      throw new ApiError(500, "Internal server erorr during subscribe");
    }
    return res.redirect(`${FRONTEND_URL}/paymentsuccess?refrence=${paymentId}`);
  }),
);

router.post("/redirect-home", (req, res) => {
  return res.redirect(`${FRONTEND_URL}/dashboard`);
});

router.post(
  "/history",
  catchAsync(async (req, res) => {
    const userId = req.userId;
    const { page = 1, limit = 10 } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const paymentHistory = await prisma.paymentHistory.findMany({
      where: {
        userId,
        status: "success",
      },
      skip,
      take: parseInt(limit as string),
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!paymentHistory) {
      throw new ApiError(500, "Error fetching payment history");
    }

    const totalPayments = await prisma.paymentHistory.count({
      where: { userId },
    });

    const totalPages = Math.ceil(totalPayments / parseInt(limit as string));
    return res.json({
      data: paymentHistory,
      currentPage: parseInt(page as string),
      totalPages,
      totalPayments,
    });
  }),
);

router.post(
  "/subscriptions",
  catchAsync(async (req, res) => {
    const userId = req.userId;

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId,
        endDate: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!subscriptions) {
      throw new ApiError(500, "Error fetching subscriptions:");
    }
    return res.json({ subscriptions });
  }),
);

router.get("/get-plans", async (req, res) => {
  return res.json({ plans });
});

router.get(
  "/credits",
  catchAsync(async (req, res) => {
    const userId = req.userId;

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.json({
      credits: user.credits,
      isPremium: user.isPremium,
    });
  }),
);

export default router;
