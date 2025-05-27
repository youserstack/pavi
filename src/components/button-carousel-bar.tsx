"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useFilterQueryEffect from "@/lib/hooks/useFilterQueryEffect";
import usePointerUpEffect from "@/lib/hooks/usePointerUpEffect";
import { useFilterStore } from "@/stores/useFilterStore";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function ButtonCarouselBar({ items }: { items: { value: string; label: string }[] }) {
  const [isDragging, setIsDragging] = useState(false);
  const { setCategory, filter } = useFilterStore();
  usePointerUpEffect(setIsDragging); // 커서스타일변경을위한 드래그이벤트설정
  useFilterQueryEffect(filter); // 필터변경시 쿼리요청

  return (
    <Carousel
      opts={{ dragFree: true }}
      onPointerDown={() => setIsDragging(true)}
      className={cn(
        "group bg-background overflow-hidden",
        isDragging ? "cursor-grabbing [&_button]:cursor-[inherit]" : "cursor-pointer"
      )}
    >
      <CarouselContent className="-ml-2">
        {items?.map((item) => (
          <CarouselItem key={item.value} className="pl-2 basis-auto">
            <Button
              className="rounded-full text-xs"
              size="sm"
              variant={filter.category?.includes(item.value) ? "default" : "outline"}
              onClick={() => setCategory(item.value)}
            >
              {item.label}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
