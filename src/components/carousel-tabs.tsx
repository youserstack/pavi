"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export default function CarouselTabs({ items }: { items: any[] }) {
  const [isDragging, setIsDragging] = useState(false);

  // 드레그시 포인터변경을위한 이벤트
  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <Tabs defaultValue="0">
      <TabsList onPointerDown={() => setIsDragging(true)} className="w-full">
        <Carousel
          opts={{ dragFree: true }}
          // 탭버튼의 가상요소(높이2픽셀의 라인)가 CarouselContent컴포넌트에서는 보여야하기때문에 overflow-visible 로 설정
          className={cn(
            "w-full overflow-hidden",
            "[&_[data-slot=carousel-content]]:overflow-visible",
            "[&_[data-slot=carousel-content]]:border-b-2",
            "[&_[data-slot=carousel-content]]:border-muted"
          )}
        >
          <CarouselContent className="-ml-0">
            {items.map((item: any, index) => (
              <TabsTrigger
                key={index}
                value={index.toString()}
                className={isDragging ? "cursor-grabbing" : "cursor-pointer"}
              >
                <CarouselItem className="pl-0">{item.label}</CarouselItem>
              </TabsTrigger>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>

      {items.map((item: any, index) => (
        <TabsContent key={index} value={index.toString()}>
          {item.label} {index.toString()} 내용....
        </TabsContent>
      ))}
    </Tabs>
  );
}
