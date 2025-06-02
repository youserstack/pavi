"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { useFilterStore } from "@/stores/useFilterStore";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

type Props = {
  // type: "category" | "brand" | "size" | "color" | "price" | "productType";
  type: keyof Filter;
  items: { value: string; label: string }[];
};

export function ToggleButtonCarousel({ type, items }: Props) {
  const { filter } = useFilterStore();
  const { isDragging, setIsDragging } = useDraggingState();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = (value: string) => {
    // 쿼리스트링을 추출하고 배열로 변환 (category, brand, color,...)
    const params = new URLSearchParams(searchParams);
    const values = params.get(type)?.split(",") ?? [];

    // 토클적용한 새로운 배열 생성
    const newValues = values.includes(value)
      ? values.filter((v) => v !== value) // 삭제
      : [...values, value]; // 추가

    // 쿼리파라미터 추가 및 삭제
    if (newValues.length > 0) {
      params.set(type, newValues.join(","));
    } else {
      params.delete(type);
    }

    // 라우팅
    router.push(`?${params.toString()}`);
  };

  return (
    <Carousel
      opts={{ dragFree: true }}
      onPointerDown={() => setIsDragging(true)}
      className={cn(
        "group bg-background overflow-hidden w-full",
        isDragging ? "cursor-grabbing [&_button]:cursor-[inherit]" : ""
      )}
    >
      <CarouselContent className="-ml-2">
        {items?.map((item) => (
          <CarouselItem key={item.value} className="pl-2 basis-auto">
            <Button
              className="rounded-full text-xs"
              size="sm"
              variant={filter[type]?.includes(item.value) ? "default" : "outline"}
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
