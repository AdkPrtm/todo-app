import { OptionsMailOTP } from "@/constants/constants";
import nodemailer from "nodemailer";

export type SendMailParams = {
    emailTo: string,
    otp: string,
    firstName: string,
}
export async function SendMailOTP(params: SendMailParams) {
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
        } else {
            console.log(result)
        }   
    } catch (error) {
        console.log(error)
        return { error: 'Failed to send email' }
    }
}