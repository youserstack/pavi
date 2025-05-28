"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { useFilterStore } from "@/stores/useFilterStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";

export function ButtonCarouselBar({ items }: { items: { value: string; label: string }[] }) {
  const { filter } = useFilterStore();
  const { isDragging, setIsDragging } = useDraggingState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (currentCategory: string) => {
    // 기존쿼리파라미터객체 -> 카테고리 -> 카테고리배열 -> 새카테고리배열
    const category = searchParams.get("category") ?? "";
    const categories = category ? category.split(",") : [];
    const newCategories = categories.includes(currentCategory) // 토글적용
      ? categories.filter((c) => c !== currentCategory)
      : [...categories, currentCategory];

    // 기존쿼리파라미터객체 + 새쿼리파라미터객체
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newCategories.length > 0) {
      // 새카테고리배열로 쉼표로구분하여 직렬화하여 새쿼리파라미터객체를 셋팅
      newSearchParams.set("category", newCategories.join(","));
    } else {
      newSearchParams.delete("category");
    }

    // 라우팅
    router.push(`?${newSearchParams.toString()}`);
  };

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
              onClick={() => handleClick(item.value)}
            >
              {item.label}
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
