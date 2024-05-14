import { SignInUserParams } from "@/types/types";
import bcrypt from 'bcryptjs'
import prisma from "../db";

export const signInUser = async (params: SignInUserParams) => {
    const user = await prisma.user.findUnique({
        where: { email: params.email }
    })
    if (!user) return { error: 'User not found' }

    const hashedPassword = await bcrypt.compare(params.password, user.password)
    if (!hashedPassword) return { error: 'Wrong password' }

    const { password: newPassword, ...allData } = user
    return { user: allData }
}

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { id: id } })
        return user
    } catch (error) {
        return null
    }
}