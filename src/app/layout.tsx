import TanstackProvider from "@/components/providers/tanstack-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { inter, notoSansKR, orbitron } from "@/lib/fonts";
import AuthProvider from "@/components/providers/auth-provider";
import Header from "@/components/header";
import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";

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
        <AuthProvider>
          <TanstackProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <Header />
              {children}
            </ThemeProvider>
          </TanstackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
