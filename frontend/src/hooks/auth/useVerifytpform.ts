"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useToken from "@/hooks/useToken";
import { toast } from "sonner";
import { VerifyEmailFormSchema, VerifyEmailFormType } from "@/lib/schema";
import { useSigninMutation } from "@/redux/service/service";

export function useVerifyOtpForm() {
  const router = useRouter();
  const { setToken } = useToken();
  const [signin, { isLoading }] = useSigninMutation();

  const form = useForm<VerifyEmailFormType>({
    resolver: zodResolver(VerifyEmailFormSchema),
    defaultValues: { email: "", otp: "" },
  });

  const onSubmit = async (values: VerifyEmailFormType) => {
    const res = await signin(values);

    if (!res.data?.success) {
      toast.error(res.data?.message || "Invalid OTP!");
      return;
    }

    setToken(res.data.token);
    router.push("/dashboard");
  };

  return { form, onSubmit, isLoading };
}
