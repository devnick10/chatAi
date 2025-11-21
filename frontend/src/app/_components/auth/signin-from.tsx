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
import { SigninFormSchema, SigninFormType } from "@/lib/schema";
import { useInitiateSigninMutation } from "@/redux/service/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function SigninFrom() {
  const [initiate_signin, { data, isError, isLoading, isSuccess }] =
    useInitiateSigninMutation();
  const form = useForm<SigninFormType>({
    resolver: zodResolver(SigninFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: SigninFormType) {
    await initiate_signin(values);
  }

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Please check your inbox for OTP");
    }
    if (isError) {
      toast.error(
        data.message || "Failed to send OTP, please retry after a minute",
      );
    }
  }, [isSuccess, isError, data]);

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
                <Input
                  placeholder="john@example.com"
                  className="focus-visible:ring-blue-500/50"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="text-black w-full" variants="simple" type={"submit"}>
          <div className="flex justify-center items-center gap-2">
            {isLoading && <SpinnerCustom />} Submit
          </div>
        </Button>
      </form>
    </Form>
  );
}
