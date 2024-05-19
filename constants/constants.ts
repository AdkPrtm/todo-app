import { MdFormatListNumbered, MdHome, MdOutlineCheck } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { NavLinkType, SendMailOTPParams, SendMailReminderParams } from "@/types/types";
import Mail from "nodemailer/lib/mailer";
import { date } from "zod";

export const NavLink: NavLinkType[] = [
    {
        icons: MdHome,
        name: 'Home',
        route: '/'
    },
    {
        icons: MdFormatListNumbered,
        name: 'Important!',
        route: '/important'
    },
    {
        icons: MdOutlineCheck,
        name: 'Completed',
        route: '/completed'
    },
    {
        icons: FaClipboardList,
        name: 'Do It Now',
        route: '/doitnow'
    },
]

export function OptionsMailOTP({ emailTo, otp, firstName }: SendMailOTPParams): Mail.Options {
    return {
        from: '"Todo App" no-reply@andhikawidiarto.my.id',
        to: emailTo,
        subject: `${otp} is your verification code`,
        html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
            <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Todo App</a>
            </div>
            <p style="font-size:1.1em">Hi, ${firstName}</p>
            <p>Thank you for choosing Todo App. Use the following OTP to complete your sign up procedures. OTP is valid for 5 minutes</p>
            <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius:  4px;">${otp}</h2>
            <p style="font-size:0.9em;">Regards,<br />Andhika Widiarto</p>
            <hr style="border:none;border-top:1px solid #eee" />
            <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Todo App</p>
                <p>Balikpapan, Kalimantan Timur</p>
                <p>Indonesia</p>
            </div>
            </div>
        </div>`,
    }
}

export function OptionsReminderMail({ emailTo, firstName, data }: SendMailReminderParams): Mail.Options {
    const tasksHTML = data.map((task) => {
        return `<li class="task">
                    <span class="task-title">${task.title}:</span> ${task.description}
                </li>`;
    }).join('');
    return {
        from: '"Todo App" no-reply@andhikawidiarto.my.id',
        to: emailTo,
        subject: "🎯 Final Reminder: Today is Your Task Deadline!",
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Reminder</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                    height: 100vh; /* Set body height to 100% of viewport height */
                    overflow: auto; /* Add overflow auto to enable scrolling if content exceeds viewport height */
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border-radius: 10px;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                }
                .header {
                    background-color: #007bff;
                    color: #fff;
                    text-align: center;
                    padding: 20px 0;
                    border-radius: 10px 10px 0 0;
                }
                .header h1 {
                    margin: 0;
                    font-size: 24px;
                }
                .content {
                    padding: 20px 0;
                }
                .task-list {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }
                .task {
                    margin-bottom: 20px;
                    border-left: 4px solid #007bff;
                    padding-left: 10px;
                }
                .task-title {
                    font-weight: bold;
                }
                .footer {
                    text-align: end;
                    margin-top: 10px;
                    padding-top: 10px;
                    border-top: 1px solid #ccc;
                }
                .footer p {
                    font-size: 12px;
                    margin: 0;
                    color: #777;
                }
                .button-container {
                    text-align: center;
                }
                .button {
                    display: inline-block;
                    background-color: #007bff;
                    color: #fff;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    margin-top: 20px;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Email Reminder: Tasks Deadline Today</h1>
                </div>
                <div class="content">
                    <p>Hi ${firstName},</p>
                    <p>This is a reminder that you have tasks with deadlines today:</p>
                    <ul class="task-list">
                        ${tasksHTML}
                    </ul>
                    <p>Remember to complete them on time!</p>
                    <div class="button-container">
                        <a href="https://todoapp.andhikawidiarto.my.id" class="button">View Tasks</a>
                    </div>
                </div>
                <div class="footer">
                    <p>Todo App</p>
                    <p>Balikpapan, Kalimantan Timur</p>
                    <p>Indonesia</p>
                </div>
            </div>
        </body>
        </html>        
        `
    }
}