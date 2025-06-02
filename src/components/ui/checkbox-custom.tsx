"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

function Checkbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      // className={cn(
      //   "peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
      //   className
      // )}
      className={cn(
        // 상태 관련
        "data-[state=checked]:text-primary-foreground",
        // "data-[state=checked]:bg-primary",
        // "data-[state=checked]:border-primary",
        // "aria-invalid:border-destructive",
        // "aria-invalid:ring-destructive/20",
        // "dark:data-[state=checked]:bg-primary",
        // "dark:aria-invalid:ring-destructive/40",

        // 포커스
        "focus-visible:border-ring",
        "focus-visible:ring-ring/50",
        "focus-visible:ring-[3px]",
        "outline-none",

        // 색상/테마
        "border-input",
        "dark:bg-input/30",

        // 레이아웃/크기
        "size-4",
        "shrink-0",
        "rounded-[4px]",
        "border",
        "shadow-xs",

        // 전환
        "transition-shadow",

        // 비활성화
        "disabled:cursor-not-allowed",
        "disabled:opacity-50",

        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        <CheckIcon className="size-3.5 stroke-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
