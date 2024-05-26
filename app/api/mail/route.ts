import { checkDeadline } from "@/lib/cronjob";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        await checkDeadline()
        return NextResponse.json({ data: 'Success', status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}