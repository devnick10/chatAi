"use client";
import { SigninFrom } from "./signin-from";
import { VerifyOtpFrom } from "./otp-from";
import { useAppSelector } from "@/redux/hooks";

export function SignInCard() {
  const step = useAppSelector((state) => state.auth.step);
  const highlight = false;
  return (
    <div
      className={`flex p-6 mt-8 overflow-hidden rounded-xl flex-col justify-start items-start gap-6 bg-gradient-to-b from-gray-50/5 to-gray-50/0 ${highlight ? "ring-2 ring-blue-500 scale-105" : ""}`}
      style={{ outline: "1px solid hsl(var(--border))", outlineOffset: "-1px" }}
    >
      <SignInCardHeader />
      <div className="w-full relative overflow-hidden">
        {step === "step1" ? <SigninFrom /> : <VerifyOtpFrom />}
      </div>
    </div>
  );
}

function SignInCardHeader() {
  return (
    <div className="text-center w-full  py-2">
      <h2 className="text-[1.7rem] font-bold text-foreground">
        Signin your account
      </h2>
      <p className="font-thin text-neutral-400">
        Get started with AI assistant today
      </p>
    </div>
  );
}
