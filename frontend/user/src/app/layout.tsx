import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SPACETRIX - Premium Co-working Spaces in Thrissur",
  description: "Work in the Heart of Thrissur. Experience premium co-working spaces with hot desks, private suites, and conference rooms at Kerala's finest workspace.",
  keywords: "coworking, Thrissur, Kerala, office space, hot desk, private suite, conference room",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
