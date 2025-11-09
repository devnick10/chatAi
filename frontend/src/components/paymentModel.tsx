import { api } from "@/lib/axios";
import { rzpResonponse } from "@/lib/type";
import { useRazorpay } from "react-razorpay";

const PaymentModel = () => {
  const { error, isLoading, Razorpay } = useRazorpay();
  async function payNow() {
    const res = await api.get("/billing/init-subscribe", {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUs2RDYwUllLN1I1MEZWSFRCNEtDVjFKUSIsImlhdCI6MTc1OTIzODU0Nn0.YAQUKrLAaOqClf6PthXNsdF8zkE5L3MNfvGk9thUKxI",
      },
    });
    const order = res.data;

    const options = {
      key: order.rzpKey,
      amount: 499,
      currency: "INR",
      name: "Chat AI",
      description: "Your AI Assistant for Everything",
      order_id: order.subscriptionId || "",
      subscription_id: order.subscriptionId,
      handler: function (response: rzpResonponse) {
        if (response) {
          api.post(
            "/subscribe",
            {
              subscriptionId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMUs2RDYwUllLN1I1MEZWSFRCNEtDVjFKUSIsImlhdCI6MTc1OTIzODU0Nn0.YAQUKrLAaOqClf6PthXNsdF8zkE5L3MNfvGk9thUKxI",
              },
            },
          );
        }
      },
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F37254",
      },
    };
    // @ts-expect-error Currency code ;
    const rzp = new Razorpay(options);
    rzp.open();
  }

  return (
    <div>
      <h1>Payment Page </h1>
      {isLoading && <p>Loading Razorpay...</p>}
      {error && <p>Error loading Razorpay: {error}</p>}
      <button onClick={payNow} disabled={isLoading}>
        Pay Now
      </button>
    </div>
  );
};

export default PaymentModel;
