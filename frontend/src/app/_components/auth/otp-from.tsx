"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SpinnerCustom } from "@/components/ui/spinner"
import useToken from "@/hooks/useToken"
import useAuth from "@/hooks/useAuth"
import { VerifyEmailFormSchema, VerifyEmailFormType } from "@/lib/schema"
import { resendOtpState } from "@/redux/features/auth/authSlice"
import { useAppDispatch } from "@/redux/hooks"
import { useSigninMutation } from "@/redux/service/service"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function VerifyOtpFrom() {
    const dispatch = useAppDispatch();
    const [signin, { data, isError, isLoading, isSuccess, error }] = useSigninMutation()
    const { user } = useAuth();
    const { setToken } = useToken();
    const router = useRouter();

    const form = useForm<VerifyEmailFormType>({
        resolver: zodResolver(VerifyEmailFormSchema),
        defaultValues: {
            email: "",
            otp: ""
        },
    })

    async function onSubmit(values: VerifyEmailFormType) {
        await signin(values)
    }

    async function handleResendOtp() {
        dispatch(resendOtpState())
    }

    useEffect(() => {
        if (user) {
            router.push('/dashboard')
        }
        if (isSuccess) {
            toast.success(data?.message || "Signin successfully.")
            setToken(data.token)
        }
        if (isError) {
            // @ts-expect-error error.data is undefined;
            toast.error(error?.data.message || 'Something went wrong.')
        }
    }, [isSuccess, isError, data, user, router, setToken, error])

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
                    <button onClick={handleResendOtp} className="text-foreground mb-2 ">resend OTP</button>
                </div>
                <Button
                    className="text-black w-full"
                    variants="simple"
                    type={'submit'}
                >
                    <div className="flex justify-center items-center gap-2">
                        {isLoading && <SpinnerCustom />}Submit
                    </div>
                </Button>
            </form>
        </Form>
    )
}