"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { userRegisterSchema } from "@/lib/validator"
import { signUpServer } from "@/lib/actions/AuthAction"
import { useTransition, useState } from "react"
import { redirect } from "next/navigation"
import ButtonSubmit from "@/components/ui/ButtonSubmit"

function Page() {
    const [isPending, startTransition] = useTransition()
    const [errorMessage, setErrorMessage] = useState<string | undefined>('')

    const form = useForm<z.infer<typeof userRegisterSchema>>({
        resolver: zodResolver(userRegisterSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof userRegisterSchema>) => {
        startTransition(async () => {
            const user = await signUpServer(values)
            if (user.error) {
                setErrorMessage(user.error)
            } else {
                form.reset()
                redirect('/')
            }
        })
    }

    return (
        <section className='flex h-screen items-center justify-center bg-slate-200 dark:bg-slate-900'>
            <div className='bg-white dark:bg-slate-800 shadow-lg text-black dark:text-white rounded-xl md:1/3 2xl:w-1/5 space-y-10 mx-2 md:mx-0 px-10 py-16'>
                <h1 className='font-medium text-3xl'>Sign up</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <div className="flex gap-x-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-light">First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Jhon" {...field} className="focus-visible:ring-offset-0" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-light">Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Dhe" {...field} className="focus-visible:ring-offset-0" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-light">Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jhon@mail.com" {...field} className="focus-visible:ring-offset-0" />
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
                                        <Input type="password" placeholder="********" {...field} className="focus-visible:ring-offset-0" />
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
                        <ButtonSubmit isPending={isPending} title="Sign Up" />
                    </form>
                </Form>
                <h2 className="font-extralight text-sm">Have an acount? <span className="font-medium"> <Link href={'/signin'}>Sign in</Link></span></h2>
            </div>
        </section>
    )
}

export default Page