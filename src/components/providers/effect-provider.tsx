"use client";

import { useSyncFilterStoreWithQueryParams } from "@/lib/hooks/useSyncFilterStoreWithQueryParams";
import { createContext } from "react";

const EffectContext = createContext({});

export default function EffectProvider({ children }: { children: React.ReactNode }) {
  useSyncFilterStoreWithQueryParams();

  return <EffectContext.Provider value={{}}>{children}</EffectContext.Provider>;
}
