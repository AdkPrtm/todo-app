"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useEffect, useState, useTransition } from "react"
import { sendOtp, SignOutServer, submitOTP } from "@/lib/actions/AuthAction"
import ButtonSubmit from "@/components/ui/ButtonSubmit"
import { redirect, useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { OtpSchema } from "@/lib/validator"

export default function InputOTPForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [errorMessage, setErrorMessage] = useState<string | null>();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const resendOTP = () => {
    startTransition(async () => {
      const res = await sendOtp()
      if (res?.error) {
        toast({
          title: 'Error sending OTP',
          description: 'Please try again later',
        })
      }
      setMinutes(0);
      setSeconds(59);
    })
  };

  const form = useForm<z.infer<typeof OtpSchema>>({
    resolver: zodResolver(OtpSchema),
    defaultValues: {
      otp: "",
    },
  })

  async function logout() {
    await SignOutServer()
    router.push("/signin")
  }

  function onSubmit(data: z.infer<typeof OtpSchema>) {
    startTransition(async () => {
      const resOtp = await submitOTP(data.otp)
      if (resOtp.error) {
        setErrorMessage(resOtp.error)
      } else {
        form.reset()
        redirect('/')
      }
    })
  }

  return (
    <section className="flex h-screen items-center justify-center bg-slate-200 dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 shadow-lg text-black dark:text-white rounded-xl md:1/3 2xl:w-1/5 space-y-10 mx-2 md:mx-0 px-10 py-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {
              errorMessage && (
                <FormItem>
                  <FormMessage>
                    <div className="mt-2 bg-red-500/70 text-xs text-white rounded-lg p-4" role="alert">
                      <span className="font-bold">Error{' '}</span>{errorMessage}
                    </div>
                  </FormMessage>
                </FormItem>
              )
            }
            {seconds > 0 || minutes > 0 ? (
              <p className="text-white/50">
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <div className="flex items-center justify-between">
                <p className="text-white/50">Didn&apos;t recieve code?</p>
                <Button type="button" onClick={resendOTP} disabled={seconds > 0 || minutes > 0} variant={"ghost"}>Resend</Button>
              </div>
            )}
            <div className="flex justify-end">
              <Button type="button" onClick={logout} variant={"ghost"} >Sign Out</Button>
              <ButtonSubmit isPending={isPending} title="Submit" width="w-1/3" />
            </div>
          </form>
        </Form>
      </div>
    </section>
  )
}
