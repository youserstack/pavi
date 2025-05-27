"use client";

import useFilterQueryEffect from "@/lib/hooks/useFilterQueryEffect";
import { createContext } from "react";

const EffectContext = createContext({});

export default function EffectProvider({ children }: { children: React.ReactNode }) {
  useFilterQueryEffect();

  return <EffectContext.Provider value={{}}>{children}</EffectContext.Provider>;
}
