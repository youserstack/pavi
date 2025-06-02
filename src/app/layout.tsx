import Providers from "@/components/providers/providers";
import { inter, notoSansKR, orbitron } from "@/lib/fonts";
import Header from "@/components/header";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "PAVI | E-Commerce",
  description: "pavi는 youserstack이 개발한 이커머스 웹 애플리케이션입니다.",
  keywords: ["pavi", "youserstack", "e-commerce"],
  icons: "/favicon.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, orbitron.variable, notoSansKR.variable, "antialiased")}>
        <Providers>
          <Header />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
