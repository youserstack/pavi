"use client";

import { useSyncFilterStoreWithSearchParams } from "@/lib/hooks/useSyncFilterStoreWithSearchParams";
import { createContext } from "react";

const EffectContext = createContext({});

export default function EffectProvider({ children }: { children: React.ReactNode }) {
  // 서치파라미터 -> 필터스토어 동기화
  useSyncFilterStoreWithSearchParams();

  return <EffectContext.Provider value={{}}>{children}</EffectContext.Provider>;
}
