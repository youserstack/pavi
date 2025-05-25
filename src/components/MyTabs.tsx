"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function MyTabs({ items }: { items: any[] }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Tabs defaultValue="men-to-men">
      <TabsList
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        className="w-full"
      >
        <Carousel
          opts={{ dragFree: true }}
          // TabsTrigger의 가상요소인 indicator line이 보이려면 CarouselContent가 오버플로우비저블 상태여야한다.
          // 부모(오버플로우히든) > 자식(오버플로우비저블)
          className="w-full overflow-hidden
          [&_[data-slot=carousel-content]]:overflow-visible
          [&_[data-slot=carousel-content]]:border-b-2
          [&_[data-slot=carousel-content]]:border-muted
          "
        >
          <CarouselContent className="-ml-0">
            {items.map((item: any, index) => (
              <TabsTrigger key={index} value={index.toString()}>
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
