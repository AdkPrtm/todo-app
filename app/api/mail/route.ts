import { checkDeadline } from "@/lib/cronjob";
import { NextResponse } from "next/server";
import cron from "node-cron";

export async function POST() {
    try {
        cron.schedule('30 1 * * *', async () => {
            checkDeadline()
        });
        return NextResponse.json({ data: 'Success', status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}