import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import { userRegisterSchema } from "@/lib/validator";
import { z } from "zod";
import { generateOTP } from "@/lib/utils";

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { firstName, lastName, email, password, verifiedEmail, avatar } = userRegisterSchema.parse(body)

        const users = await prisma.user.findFirst({
            where: { email: email },
        });
        if (users) return NextResponse.json({ message: "Account already exists" }, { status: 403 })

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
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

        const { password: newPassword, ...allData } = newUser
        return NextResponse.json({ data: allData }, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json({ error: { validation_error: error.errors } }, { status: 403 })
        } else {
            console.error('Unexpected error:', error);
            return NextResponse.json({ error: 'Something went wrong!' }, { status: 500 })
        }
    }
}