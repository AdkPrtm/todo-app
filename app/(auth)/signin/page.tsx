"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { SignInServer } from "../../../lib/actions/AuthAction"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { userLoginSchema } from "@/lib/validator"
import ButtonSubmit from "@/components/ui/ButtonSubmit"



function Page() {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')
    const form = useForm<z.infer<typeof userLoginSchema>>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof userLoginSchema>) => {
        startTransition(async () => {
            const res = await SignInServer(values)
            setErrorMessage(res?.error)
            if (res?.user) {
                form.reset()
                router.push('/')
            }
        })
    }
    return (
        <section className='flex h-screen items-center justify-center bg-slate-200 dark:bg-slate-900'>
            <div className='bg-white dark:bg-slate-800 text-black dark:text-white rounded-xl md:w-1/3 2xl:w-1/5 space-y-10 px-10 py-16'>
                <h1 className='font-medium text-3xl'>Sign in</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-light">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jhon@mail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-light">Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
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
                                            <span className="font-bold">Error</span> {errorMessage}
                                        </div>
                                    </FormMessage>
                                </FormItem>
                            )
                        }
                        <ButtonSubmit isPending={isPending} title="Sign In"/>
                    </form>
                </Form>
                <h2 className="font-extralight text-sm">Don&apos;t have an acount? <span className="font-medium"> <Link href={'/signup'}>Sign up</Link></span></h2>
            </div>
        </section>
    )
}

export default Page