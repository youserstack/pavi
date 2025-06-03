"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { filterItems } from "@/data/filter-items";
import useDraggingState from "@/lib/hooks/useDraggingState";

type Props = { items: { value: string; label: string }[] };
const items = filterItems;

export default function TabButtonCarousel1() {
  const { isDragging, setIsDragging } = useDraggingState();

  return (
    <Tabs defaultValue={items[0].value}>
      <TabsList onPointerDown={() => setIsDragging(true)} className="w-full">
        <Carousel
          opts={{ dragFree: true }}
          // 탭버튼의 가상요소(높이2픽셀의 라인)가 CarouselContent컴포넌트에서는 보여야하기때문에 overflow-visible 로 설정
          className={cn(
            "w-full overflow-hidden",
            "[&_[data-slot=carousel-content]]:overflow-visible",
            "[&_[data-slot=carousel-content]]:border-b-2"
            // "[&_[data-slot=carousel-content]]:border-muted"
          )}
        >
          <CarouselContent className="-ml-0">
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={isDragging ? "cursor-grabbing" : "cursor-pointer"}
              >
                <CarouselItem className="pl-0">{item.label}</CarouselItem>
              </TabsTrigger>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.label} ....
        </TabsContent>
      ))}
    </Tabs>
  );
}
