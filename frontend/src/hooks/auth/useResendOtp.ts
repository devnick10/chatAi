"use client";

import { VerifyEmailFormType } from "@/lib/schema";
import { useResendOtpMutation } from "@/redux/service/service";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function useResendOtp(form: UseFormReturn<VerifyEmailFormType>) {
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  const handleResendOtp = async () => {
    try {
      const email = form.getValues("email");

      if (!email) {
        toast.error("Email is missing.");
        return;
      }

      await resendOtp({ email }).unwrap();
      toast.success("OTP resent successfully.");
    } catch (err) {
      // @ts-expect-error err might be empty
      toast.error(err?.data?.message || "Failed to resend OTP.");
    }
  };

  return { handleResendOtp, isResending };
}
