"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useResendOtp } from "@/hooks/auth/useResendOtp";
import { useVerifyOtpForm } from "@/hooks/auth/useVerifytpform";

export function VerifyOtpFrom() {
  const { form, onSubmit, isLoading } = useVerifyOtpForm();
  const { handleResendOtp, isResending } = useResendOtp(form);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP</FormLabel>
              <FormControl>
                <Input placeholder="OTP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end m-0 mb-2 underline">
          <button onClick={handleResendOtp} disabled={isResending} className="text-foreground mb-2 ">
            resend OTP
          </button>
        </div>
        <div>
          <Button className="text-black w-full" variants="simple" type={"submit"}>
            <div className="flex justify-center items-center gap-2">
              {isLoading && <SpinnerCustom />}Submit
            </div>
          </Button>
        </div>
      </form>
    </Form>
  );
}
