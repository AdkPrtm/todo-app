import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ProviderTheme } from "../providers/ThemeProvider";
import Sidebar from "@/components/shared/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_WEBSITE_URL}`),
  
  title: "Todo App",
  description: "Stay organized and boost your productivity with our user-friendly to-do application. Manage tasks, set reminders, and track progress seamlessly. Perfect for individuals and teams looking to streamline their workflow. Try our task manager today!",

  openGraph: {
    title: "Todo App",
    description:
      "Stay organized and boost your productivity with our user-friendly to-do application. Manage tasks, set reminders, and track progress seamlessly. Perfect for individuals and teams looking to streamline their workflow. Try our task manager today!",
    url: process.env.NEXT_WEBSITE_URL,
    siteName: "TodoApp by Andhika Widiarto",
    images: "/images/homescreen.png",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <ProviderTheme>
          {/* <SessionProvider> */}
          <div className="grid grid-cols-6 h-[calc(100vh-24px)] md:h-screen lg:p-10 gap-x-4">
            <Sidebar />
            {/* <GlobalProvider> */}
            {children}
            {/* </GlobalProvider> */}
          </div>
          {/* </SessionProvider> */}
        </ProviderTheme>
      </body>
    </html>
  );
}