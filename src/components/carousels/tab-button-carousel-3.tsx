"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { Swiper, SwiperSlide } from "swiper/react";
import { filterItems } from "@/data/filterItems";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorFilter } from "@/components/filters/color-filter";
import { ColorFilter2 } from "@/components/filters/color-filter-2";
import { ColorFilter3 } from "@/components/filters/color-filter-3";

const items = filterItems;

export default function TabButtonCarousel3() {
  const { isDragging, setIsDragging } = useDraggingState();
  const [activeTab, setActiveTab] = useState<string>(items[0]?.value); // 초기 탭 값 설정
  const swiperRef = useRef<SwiperCore>(null);

  return (
    <div
      onPointerDown={() => setIsDragging(true)}
      className={`flex-1 flex flex-col min-h-0
      ${isDragging ? "[&_button]:cursor-grabbing" : "[&_button]:cursor-pointer"} `}
    >
      <Carousel>
        <CarouselContent className="-ml-0">
          {items.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setActiveTab(item.value);
                const index = items.findIndex((i) => i.value === item.value);
                if (index !== -1) swiperRef.current?.slideTo(index, 0); // 0ms 속도로 즉시 이동
              }}
              className={`px-2 py-1 text-sm border-muted border-b-2 relative flex-1
              ${activeTab === item.value ? "text-foreground" : "text-muted-foreground"}  `}
            >
              <CarouselItem className="pl-0">{item.label}</CarouselItem>
              <div
                className={`absolute top-full left-0 right-0 w-full h-[2px] bg-foreground
                ${activeTab === item.value ? "block" : "hidden"}  `}
              />
            </button>
          ))}
        </CarouselContent>
      </Carousel>

      <Swiper
        className="size-full /w-full /h-full" // 스와이프 루트에 가로, 높이 명시
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const newIndex = swiper.realIndex;
          const newTab = items[newIndex]?.value;
          if (newTab) setActiveTab(newTab);
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <ScrollArea
              className="h-full" // 스크롤 루트에 높이 명시
            >
              {item.label} - 콘텐츠 {index}
              {item.value === "color" && <ColorFilter3 />}
            </ScrollArea>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
