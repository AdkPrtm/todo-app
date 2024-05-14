import prisma from "@/lib/db/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    return NextResponse.json({
        message: "Hello World",
    });
}