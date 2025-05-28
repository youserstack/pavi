"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { useFilterStore } from "@/stores/useFilterStore";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useQueryProducts } from "@/lib/hooks/useQueryProducts";

export function ButtonCarouselBar({ items }: { items: { value: string; label: string }[] }) {
  const { filter } = useFilterStore();
  const { isDragging, setIsDragging } = useDraggingState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (currentCategory: string) => {
    // 파라미터스트링 -> 배열 -> 토글적용된 배열 -> 파라미터스트링 -> 라우팅

    // 기존서치파라미터객체로부터 카테고리스트링을 받고
    // 카테고리스트링은 쉼표로 구분된 아이템들로서 스필릿하여 배열로 만들고(기존 클릭된 카테고리를 토글적용하기 위해서)
    const categoriesString = searchParams.get("categories") ?? "";
    const categories = categoriesString ? categoriesString.split(",") : [];
    console.log({ categories });
    const newCategories = categories.includes(currentCategory) // 토글적용
      ? categories.filter((c) => c !== currentCategory)
      : [...categories, currentCategory];
    console.log({ newCategories });

    // 토글적용된 새카테고리배열로부터 직렬화한 스트링으로 만들어 새로운 서치파라미터객체에 설정해야함
    const params = new URLSearchParams(searchParams.toString());
    // 빈배열이 이라면 삭제하고, 아니라면 쿼리스트링으로 설정한다
    if (newCategories.length > 0) {
      params.set("categories", newCategories.join(","));
    } else {
      params.delete("categories");
    }

    // 라우팅
    router.push(`?${params.toString()}`);
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
              variant={filter.categories?.includes(item.value) ? "default" : "outline"}
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
