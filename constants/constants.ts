import { MdFormatListNumbered, MdHome, MdOutlineCheck } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa6";
import { NavLinkType } from "@/types/types";
import Mail from "nodemailer/lib/mailer";
import { SendMailParams } from "@/lib/nodemailer";

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

export function OptionsMailOTP({ emailTo, otp, firstName }: SendMailParams): Mail.Options {
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