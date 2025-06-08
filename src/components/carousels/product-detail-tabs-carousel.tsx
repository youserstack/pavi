"use client";

import { Context } from "@/components/providers/providers";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockupProductImages } from "@/data/mockups";
// import { mockupProductImages } from "@/data/image-urls";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

export default function ProductDetailTabsCarousel() {
  const { isDragging, setIsDragging } = useDraggingState();
  const { currentTab, setCurrentTab } = useContext(Context);

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab}>
      <TabsList onPointerDown={() => setIsDragging(true)} className="w-full">
        <Carousel opts={{ dragFree: true }} className="w-full">
          <CarouselContent className="-ml-0">
            {items.map((item) => (
              <CarouselItem key={item.value} className="pl-0 basis-auto/ flex-1/ grow">
                <TabsTrigger
                  value={item.value}
                  className={cn(
                    "w-full",
                    "block relative pt-[4px] pb-[6px] data-[state=active]:[&_.line-bar]:bg-primary",
                    // "block  data-[state=active]:border-b-2 data-[state=active]:border-b-primary",
                    isDragging ? "cursor-grabbing" : "cursor-pointer"
                  )}
                >
                  {item.label}
                  <div className="line-bar absolute left-0 right-0 bottom-0 w-full h-[2px] bg-transparent"></div>
                </TabsTrigger>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute left-0 right-0 bottom-0 w-full h-[2px] bg-muted z-[-1]"></div>
        </Carousel>
      </TabsList>

      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.label} ....
          {item.value === "info" &&
            mockupProductImages.map((image, index) => (
              <Image key={index} src={image} alt="" width={1000} height={1000} className="w-full" />
            ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}

const items = [
  { value: "info", label: "정보" },
  { value: "review", label: "리뷰" },
  { value: "qna", label: "문의" },
];
