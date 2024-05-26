import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ProviderTheme } from "../providers/ThemeProvider";
import Sidebar from "@/components/shared/Sidebar";
import NextTopLoader from "nextjs-toploader";
import { sessionData } from "@/lib/actions/AuthAction";
import { redirect } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const runtime = 'edge'

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_WEBSITE_URL}`),

  title: "Todo App",
  description: "Stay organized and boost your productivity with our user-friendly to-do application. Manage tasks, set reminders, and track progress seamlessly. Perfect for individuals and teams looking to streamline their workflow. Try our task manager today!",
  // icons: `/favicon.ico`,

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dataSession = await sessionData()
  const isVerified = dataSession?.verifiedEmail
  if (!isVerified) return redirect('/verification')
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <NextTopLoader
          height={2}
          color="#27AE60"
          easing="cubic-bezier(0.53,0.21,0,1)"
        />
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