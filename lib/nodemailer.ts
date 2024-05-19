import { OptionsMailOTP, OptionsReminderMail } from "@/constants/constants";
import { SendMailOTPParams, SendMailReminderParams } from "@/types/types";
import nodemailer from "nodemailer";

export async function SendMailOTP(params: SendMailOTPParams) {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    try {
        const result = await transport.sendMail(OptionsMailOTP(params))
        if (result.messageId) {
            return { success: 'Success, sent email' }
        }
    } catch (error) {
        return { error: 'Failed to send email' }
    }
}

export async function SendMailReminder(params: SendMailReminderParams) {
    const transport = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    try {
        const result = await transport.sendMail(OptionsReminderMail(params))
        if (result.messageId) {
            return { success: 'Success, sent email' }
        }
    } catch (error) {
        return { error: 'Failed to send email' }
    }
}