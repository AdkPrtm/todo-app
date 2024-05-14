import { Inter } from "next/font/google";
import "@/app/globals.css";
import { ProviderTheme } from "../providers/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });
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