import z from "zod";

export const SigninFormSchema = z.object({
  email: z.email(),
});

export const VerifyEmailFormSchema = z.object({
  email: z.email(),
  otp: z.string("Otp is required").min(6).max(6),
});

export type SigninFormType = z.infer<typeof SigninFormSchema>;
export type VerifyEmailFormType = z.infer<typeof VerifyEmailFormSchema>;
