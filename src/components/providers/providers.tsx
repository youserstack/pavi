"use client";

import AuthProvider from "@/components/providers/auth-provider";
import TanstackProvider from "@/components/providers/tanstack-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { createContext, useState } from "react";

export const Context = createContext<{
  isMobile: boolean;
  isDesktop: boolean;
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}>({
  isMobile: false,
  isDesktop: true,
  currentTab: "info",
  setCurrentTab: () => {}, // 기본값 필요 (실제 사용 시 override됨)
});

export default function Providers({ children }: { children: React.ReactNode }) {
  // 브레이크포인트
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // const isMobile = useMediaQuery("(max-width: 767px)");
  // const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  // const isDesktop = useMediaQuery("(min-width: 1024px)");

  // 탭관리
  const [currentTab, setCurrentTab] = useState("info");

  return (
    <Context.Provider value={{ isMobile, isDesktop, currentTab, setCurrentTab }}>
      <AuthProvider>
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </AuthProvider>
    </Context.Provider>
  );
}
