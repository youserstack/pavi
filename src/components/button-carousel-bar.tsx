"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useFilterStore } from "@/stores/useFilterStore";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ButtonCarouselBar({ items }: { items: { value: string; label: string }[] }) {
  const { setCategory, filter } = useFilterStore();
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

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
