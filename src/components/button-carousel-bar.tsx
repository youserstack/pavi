"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useFilterStore } from "@/stores/useFilterStore";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Props = {
  items: { value: string; label: string }[];
};

export function ButtonCarouselBar({ items }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const { setCategory, filter } = useFilterStore();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    router.push(`?${params.toString()}`);
  }, [filter]);

  // 드레그시 포인터변경을위한 이벤트
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
        "group bg-background",
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
