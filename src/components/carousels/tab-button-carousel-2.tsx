"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { filterItems } from "@/data/filterItems";
import useDraggingState from "@/lib/hooks/useDraggingState";
import SwiperCore from "swiper";
import "swiper/css";

type Props = { items: { value: string; label: string }[] };
const items = filterItems;

export default function TabButtonCarousel2() {
  const { isDragging, setIsDragging } = useDraggingState();
  const [activeTab, setActiveTab] = useState<string>(items[0]?.value); // 초기 탭 값 설정
  const swiperRef = useRef<SwiperCore>(null);

  return (
    <Tabs
      value={activeTab}
      // 탭 클릭 시 Swiper 슬라이드 이동 및 activeIndex 설정
      onValueChange={(value) => setActiveTab(value)}
      className="h-full"
    >
      <TabsList onPointerDown={() => setIsDragging(true)} className="w-full">
        <Carousel
          opts={{ dragFree: true }}
          // 탭버튼의 가상요소(높이2픽셀의 라인)가 CarouselContent컴포넌트에서는 보여야하기때문에 overflow-visible 로 설정
          className={cn(
            "w-full overflow-hidden",
            "[&_[data-slot=carousel-content]]:overflow-visible",
            "[&_[data-slot=carousel-content]]:border-b-2",
            "[&_[data-slot=carousel-content]]:border-muted"
          )}
        >
          <CarouselContent className="-ml-0">
            {items.map((item) => (
              <TabsTrigger
                key={item.value}
                value={item.value}
                className={isDragging ? "cursor-grabbing" : "cursor-pointer"}
              >
                <CarouselItem className="pl-0">{item.label}</CarouselItem>
              </TabsTrigger>
            ))}
          </CarouselContent>
        </Carousel>
      </TabsList>

      <TabsContent value={activeTab}>
        <Swiper
          // 키로 재마운트
          key={activeTab}
          // 초기 슬라이드의 인덱스 설정
          initialSlide={items.findIndex((i) => i.value === activeTab)}
          // 초기 렌더링시, 재마운트시 실행
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // console.log("onSwiper");
          }}
          // 슬라이드 이동시 실행
          onSlideChange={(swiper) => {
            const newValue = items[swiper.activeIndex].value;
            setActiveTab(newValue);
            // console.log("onSlideChange");
          }}
          className="h-full"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              {item.label} - 콘텐츠 {index}
            </SwiperSlide>
          ))}
        </Swiper>
      </TabsContent>
    </Tabs>
  );
}
