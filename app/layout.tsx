import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const merriweather = Merriweather({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-merriweather" });

export const metadata: Metadata = {
    title: "Nguyễn Mạnh Đạt - Construction Cost Engineer",
    description: "Portfolio of Nguyễn Mạnh Đạt - Construction Cost Engineer",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased bg-muted/30`} suppressHydrationWarning>
                <Providers>
                    {/* Main content wrapper - centered with max-width */}
                    <div className="min-h-screen max-w-5xl mx-auto bg-background shadow-xl">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
