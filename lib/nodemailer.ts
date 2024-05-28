import { OptionsMailOTP, OptionsReminderMail } from "@/constants/constants";
import { SendMailOTPParams, SendMailReminderParams } from "@/types/types";
import nodemailer, { SentMessageInfo } from "nodemailer";

const ConfNodemailer = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
})
export async function SendMailOTP(params: SendMailOTPParams) {
    await new Promise((resolve, reject) => {
        ConfNodemailer.verify(function (error, success) {
            if (error) {
                reject(error);
            } else {
                resolve(success);
            }
        });
    });

    await new Promise((resolve, reject) => {
        ConfNodemailer.sendMail(OptionsMailOTP(params), (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
}

export async function SendMailReminder(params: SendMailReminderParams) {
    await new Promise((resolve, reject) => {
        ConfNodemailer.verify(function (error, success) {
            if (error) {
                reject(error);
            } else {
                resolve(success);
            }
        });
    });

    const data: SentMessageInfo | Error = await new Promise((resolve, reject) => {
        ConfNodemailer.sendMail(OptionsReminderMail(params), (err, info) => {
            if (err) {
                reject(err);
            } else {
                console.log(info.messageId);
                resolve(info);
            }
        });
    });
    if (data.messageId) {
        return data.messageId
    } else {
        return 'Error'
    }
}