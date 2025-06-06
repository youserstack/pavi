"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function CountController() {
  const [count, setCount] = useState(0);

  return (
    <div className="mx-auto p-4 pb-0 flex items-center">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => setCount((state) => state - 1)}
        disabled={count <= 0}
      >
        <Minus />
        <span className="sr-only">Decrease</span>
      </Button>

      <div className="flex-1 text-center">
        <div className="text-xl font-bold tracking-tighter">{count}</div>
      </div>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 shrink-0 rounded-full"
        onClick={() => setCount((state) => state + 1)}
        disabled={count >= 100}
      >
        <Plus />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
}
