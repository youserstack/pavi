"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn("inline-flex h-9 w-fit items-center justify-center", className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // 상태 관련 스타일
        "data-[state=active]:text-foreground",
        "data-[state=active]:border-foreground",

        // 텍스트 및 색상
        "text-muted-foreground dark:text-muted-foreground",
        "font-medium text-sm whitespace-nowrap",

        // 레이아웃 및 크기
        "inline-flex flex-1 items-center justify-center gap-1.5",
        "h-[calc(100%-1px)]",
        "px-2 py-1",

        // 테두리 및 배경
        "border-b-2 border-transparent",

        // 인터랙션 및 전환
        "transition-[color]",
        "focus-visible:ring-[3px] focus-visible:outline-1",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring",

        // 비활성 상태
        "disabled:pointer-events-none disabled:opacity-50",

        // 내부 SVG 스타일
        "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",

        // 외부에서 전달된 클래스
        className
      )}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
