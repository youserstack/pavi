"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { useSearchParams } from "next/navigation";
import { categoryItems } from "@/data/items";
import { cn } from "@/lib/utils";

export default function TabsCarousel({ items }: { items: { value: string; label: string }[] }) {
  const { isDragging, setIsDragging } = useDraggingState();

  const params = useSearchParams();
  const categoryParam = params.get("category") ?? "";
  // console.log({ categoryParam });

  const foundCategory = categoryItems.find((item) => item.id === categoryParam);
  const subCategoryItems = foundCategory?.children?.length
    ? [{ id: "all", name: "전체" }, ...foundCategory.children]
    : [{ id: "all", name: "전체" }];

  console.log({ subCategoryItems });

  if (!categoryParam) return null;

  return (
    <Tabs defaultValue={subCategoryItems[0].id}>
      <TabsList onPointerDown={() => setIsDragging(true)}>
        <Carousel opts={{ dragFree: true }}>
          <CarouselContent className="-ml-0">
            {subCategoryItems.map((item) => (
              <TabsTrigger
                key={item.id}
                value={item.id}
                className={cn(
                  "block data-[state=active]:border-b-2 data-[state=active]:border-b-primary",
                  isDragging ? "cursor-grabbing" : "cursor-pointer"
                )}
              >
                <CarouselItem className="pl-0">{item.name}</CarouselItem>
              </TabsTrigger>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>

      {subCategoryItems.map((item) => (
        <TabsContent key={item.id} value={item.id}>
          {item.name} ....
        </TabsContent>
      ))}
    </Tabs>
  );
}
