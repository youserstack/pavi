"use client";

import useSyncQueryParamsWithFilterStore from "@/lib/hooks/useSyncQueryParamsWithFilterStore";
import { createContext } from "react";

const EffectContext = createContext({});

export default function EffectProvider({ children }: { children: React.ReactNode }) {
  useSyncQueryParamsWithFilterStore();

  return <EffectContext.Provider value={{}}>{children}</EffectContext.Provider>;
}
