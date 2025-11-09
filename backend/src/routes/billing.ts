import axios from "axios";
import crypto from "crypto";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth-middleware";
import { prisma } from "..";
const router = Router();

const razorpayCredentials = {
  key: process.env.RAZORPAY_KEY_ID,
  secret: process.env.RAZORPAY_KEY_SECRET,
  plan_id: process.env.RAZORPAY_PLAN_ID,
  environment: process.env.RAZORPAY_ENVIRONMENT,
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
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(body.toString())
      .digest("hex");

    return expectedsignature === signature;
  } catch (error) {
    console.error("Signature verification failed: ", error);
    return false;
  }
}

// create a subscription
router.get("/init-subscribe", authMiddleware, async (req, res) => {
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
      return_url: `${process.env.FRONTEND_URL}`,
    },
  };

  try {
    // creat a subscription
    const subscritions = await axios.post(subscriptionUrl, orderData, {
      headers,
    });
    const { id } = subscritions.data;

    if (!id) {
      return res.status(500).json({ error: "Missing payment session ID" });
    }

    await prisma.paymentHistory.create({
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
    return res.json({ subscriptionId: id, rzpKey: razorpayCredentials.key });
  } catch (error: any) {
    console.error("Error creating order", error);
    return res.status(500).json({
      error: "Internal server erorr during order creation",
      details: error.message,
    });
  }
});

router.post("/subscribe", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { subscriptionId, paymentId, signature } = req.body;

  const existingPayment = await prisma.paymentHistory.findFirst({
    where: {
      bankReference: subscriptionId,
      userId,
    },
  });

  if (!existingPayment) {
    return res.status(500).json({ error: "Invalid session ID" });
  }

  if (!verifyRazorpaySignature(subscriptionId, paymentId, signature)) {
    return res.status(500).json({ error: "Invalid signature" });
  }

  try {
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

    await prisma.subscription.create({
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
    return res.redirect(
      `${process.env.FRONTEND_URL}/paymentsuccess?refrence=${paymentId}`,
    );
  } catch (error: any) {
    console.error("Error while subscribe", error);
    return res.status(500).json({
      error: "Internal server erorr during subscribe",
      details: error.response.data || error.message,
    });
  }
});

router.post("/redirect-home", (req, res) => {
  return res.redirect(`${process.env.FRONTEND_URL}/dashboard`);
});

router.post("/history", authMiddleware, async (req, res) => {
  const userId = req.userId;
  const { page = 1, limit = 10 } = req.query;

  try {
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
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/subscriptions", authMiddleware, async (req, res) => {
  const userId = req.userId;

  try {
    const subscriptions = await prisma.subscription.findMany({
      where: {
        userId,
        endDate: { gte: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
    return res.json({ subscriptions });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/get-plans", async (req, res) => {
  return res.json({ plans });
});

router.get("/credits", async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({
      credits: user.credits,
      isPremium: user.isPremium,
    });
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
