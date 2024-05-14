import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ProviderTheme } from "../providers/ThemeProvider";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL(`${process.env.NEXT_WEBSITE_URL}`),
    
    title: "Auth Todo App",
    description: "Stay organized and boost your productivity with our user-friendly to-do application. Manage tasks, set reminders, and track progress seamlessly. Perfect for individuals and teams looking to streamline their workflow. Try our task manager today!",

    openGraph: {
        title: "Auth Todo App",
        description:
            "Stay organized and boost your productivity with our user-friendly to-do application. Manage tasks, set reminders, and track progress seamlessly. Perfect for individuals and teams looking to streamline their workflow. Try our task manager today!",
        url: process.env.NEXT_WEBSITE_URL,
        siteName: "TodoApp by Andhika Widiarto",
        images: "/images/homescreen.png",
        type: "website",
    },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
            <body className={inter.className} suppressHydrationWarning={true}>
                <ProviderTheme>
                    {children}
                </ProviderTheme>
            </body>
        </html>
    )
}