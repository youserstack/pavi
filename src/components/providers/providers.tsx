"use client";

import AuthProvider from "@/components/providers/auth-provider";
import TanstackProvider from "@/components/providers/tanstack-provider";
import ThemeProvider from "@/components/providers/theme-provider";
import { useSyncFilterStoreWithSearchParams } from "@/lib/hooks/useSyncFilterStoreWithSearchParams";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { createContext } from "react";

export const Context = createContext<{
  isMobile: boolean;
  isDesktop: boolean;
}>({
  isMobile: false,
  isDesktop: true,
});

export default function Providers({ children }: { children: React.ReactNode }) {
  // 서치파라미터 -> 필터스토어 동기화
  useSyncFilterStoreWithSearchParams();

  // 브레이크포인트
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isDesktop = useMediaQuery("(min-width: 768px)");
  // const isMobile = useMediaQuery("(max-width: 767px)");
  // const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  // const isDesktop = useMediaQuery("(min-width: 1024px)");

  return (
    <Context.Provider value={{ isMobile, isDesktop }}>
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
