'use server'

import { auth, signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { z } from "zod"
import { userRegisterSchema } from "../validator"
import bcrypt from "bcryptjs";
import prisma from "../db/db"
import { generateOTP } from "../utils"
import { addMinutes } from 'date-fns';
import { SendMailOTP, SendMailParams } from "../nodemailer"

export const signUpServer = async (values: z.infer<typeof userRegisterSchema>) => {
    const { firstName, lastName, email, password, verifiedEmail, avatar } = values

    const users = await prisma.user.findFirst({
        where: { email: email },
    });
    if (users) return { error: 'User Already Registered' }

    const hashedPassword = await bcrypt.hash(password, 10)
    await prisma.user.create({
        data: {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            verifiedEmail,
            avatar
        }
    })

    return { success: 'User created successfully' }
}

export async function SignInServer(formSchema: any) {
    try {
        const user = await signIn('credentials', { ...formSchema, redirect: false })
        return { user: user }
    } catch (error) {
        if (error instanceof AuthError) {
            const message = JSON.parse(error.cause?.err?.message!)
            return { error: message.errors }
        }
        return { error: `log: ${error}` }
    }
}

export async function SignOutServer() {
    return await signOut()
}

export const sessionData = async () => {
    const session = await auth()
    return session?.user
}

export const sendOtp = async () => {
    const data = await sessionData()
    if (!data?.id || data?.verifiedEmail) return { error: 'User not found' }
    const otp = generateOTP()
    try {
        const existingReqOtp = await prisma.otp.findFirst({ where: { userId: data.id } })

        if (!existingReqOtp) {
            await prisma.otp.create({
                data: {
                    userId: data.id,
                    OTP: otp,
                    expiresAt: addMinutes(Date.now(), 5)
                }
            })
        } else {
            await prisma.otp.update({
                where: {
                    id: existingReqOtp.id
                },
                data: {
                    OTP: otp,
                    createdAt: new Date(),
                    expiresAt: addMinutes(Date.now(), 5)
                }
            })
        }

        if (!data.email) return;
        const dataParams: SendMailParams = {
            emailTo: data.email,
            otp,
            firstName: data.firstName.charAt(0).toUpperCase() + data.firstName.slice(1),
        }
        const resMail = await SendMailOTP(dataParams)
        return { success: resMail }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}

export const submitOTP = async (otp: string) => {
    const data = await sessionData()
    if (!data?.id) return { error: 'User not found' }
    try {
        const res = await prisma.otp.findFirst({
            where: {
                OTP: otp,
                userId: data.id
            }
        })
        if (res?.OTP != otp) return { error: 'OTP Not Match' }
        await prisma.user.update({
            where: {
                id: data.id
            },
            data: {
                verifiedEmail: true
            }
        })
        return { success: 'Success verified email' }
    } catch (error) {
        return { error: 'Something went wrong' }
    }
}