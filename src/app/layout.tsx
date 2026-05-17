import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AIChat } from "@/components/chatbot/ai-chat";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "AETHELRED ELITE ESTATE NEXUS",
  description:
    "Luxury real estate command center — portfolio analytics, CRM, and AI property intelligence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans`}>
        {children}
        <AIChat />
      </body>
    </html>
  );
}