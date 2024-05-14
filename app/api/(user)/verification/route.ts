import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";
import { use } from "react";


export async function POST(req: Request): Promise<NextResponse> {
    try {
        const body = await req.json();
        const { userId, otp } = body

        const existingReqOtp = await prisma.otp.findFirst({
            where: {
                userId: userId
            }
        })

        if (!existingReqOtp) return NextResponse.json({ message: "Something went wrong" }, { status: 404 })

        const OTPExpire = new Date() > new Date(existingReqOtp.expiresAt)
        if (otp != existingReqOtp.OTP || OTPExpire) return NextResponse.json({ message: "OTP wrong or expire" }, { status: 403 })

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            }
        })

        if (user?.verifiedEmail) return NextResponse.json({ message: "User has been verified" }, { status: 403 })
        
        await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                verifiedEmail: true
            }
        })
        return NextResponse.json({message: 'Success verified user'}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: 'Failed verified user'}, {status: 500})
    }
}