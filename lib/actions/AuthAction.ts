'use server'

import { auth, signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"
import { z } from "zod"
import { userRegisterSchema } from "../validator"
import bcrypt from "bcryptjs";
import prisma from "../db/db"
import { generateOTP } from "../utils"

export const signUpServer = async (values: z.infer<typeof userRegisterSchema>) => {
    const { firstName, lastName, email, password, verifiedEmail, avatar } = values
    
    const users = await prisma.user.findFirst({
        where: { email: email },
    });
    if (users) return {error: 'User Already Registered'}

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
            verifiedEmail,
            avatar
        }
    })

    await prisma.otp.create({
        data: {
            userId: newUser.id,
            OTP: generateOTP(),
            expiresAt: new Date(Date.now() + 5 * 60 * 1000)
        }
    })
    
    return {success: 'User created successfully'}
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
