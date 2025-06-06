"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { useSearchParams } from "next/navigation";
import { categoryItems } from "@/data/items";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CategoryTabsCarousel() {
  const { isDragging, setIsDragging } = useDraggingState();

  // 현재 파라미터로 동일레벨의 카테고리 리스트를 찾는다
  const params = useSearchParams();
  const categoryParam = params.get("category") ?? "";
  const items = findCategorySiblings(categoryParam);
  // console.log({ items });

  if (!categoryParam || !items?.length) return null;

  const defaultTab = items.find((i) => i.id === categoryParam)?.id ?? items[0].id;

  return (
    <Tabs key={categoryParam} defaultValue={defaultTab}>
      <TabsList onPointerDown={() => setIsDragging(true)} className="w-full">
        <Carousel opts={{ dragFree: true }} className="w-full">
          <CarouselContent className="-ml-0">
            {items?.map((item) => (
              <CarouselItem key={item.id} className="pl-0 basis-auto">
                <Link href={`/products?category=${item.id}`}>
                  <TabsTrigger
                    value={item.id}
                    className={cn(
                      "block relative pt-[4px] pb-[6px] data-[state=active]:[&_.line-bar]:bg-primary",
                      // "block  data-[state=active]:border-b-2 data-[state=active]:border-b-primary",
                      isDragging ? "cursor-grabbing" : "cursor-pointer"
                    )}
                  >
                    {item.name}
                    <div className="line-bar absolute left-0 right-0 bottom-0 w-full h-[2px] bg-transparent"></div>
                  </TabsTrigger>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-0 right-0 bottom-0 w-full h-[2px] bg-muted z-[-1]"></div>
        </Carousel>
      </TabsList>
    </Tabs>
    // {subCategoryItems.map((item) => (
    //   <TabsContent key={item.id} value={item.id}>
    //     {item.name} ....
    //   </TabsContent>
    // ))}
  );
}

const findCategorySiblings = (categoryParam: string): CategoryItem[] | undefined => {
  // for (const item of categoryItems) {
  //   // 최상위에서 찾은 경우 → 최상위 전체 리턴
  //   if (item.id === categoryParam) {
  //     return categoryItems;
  //   }

  //   // 두 번째 레벨에서 찾은 경우 → 해당 children 배열 리턴
  //   if (item.children) {
  //     for (const child of item.children) {
  //       if (child.id === categoryParam) {
  //         return item.children;
  //       }
  //     }
  //   }
  // }

  for (const item of categoryItems) {
    // 1단계: 최상위에서 찾은 경우
    if (item.id === categoryParam) {
      return categoryItems;
    }

    // 2단계: 자식(child) 안에서 찾은 경우
    if ("children" in item && Array.isArray(item.children)) {
      for (const child of item.children) {
        if (child.id === categoryParam) {
          return item.children;
        }
      }
    }
  }

  return undefined; // 찾지 못했을 경우
};
