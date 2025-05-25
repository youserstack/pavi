"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css";

export default function CarouselTabsV2({ items }: { items: { value: string; label: string }[] }) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(items[0]?.value); // 초기 탭 값 설정
  const swiperRef = useRef<SwiperCore>(null);

  // 드레그시 포인터변경을위한 이벤트
  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return (
    <Tabs
      value={activeTab}
      // 탭 클릭 시 Swiper 슬라이드 이동 및 activeIndex 설정
      onValueChange={(value) => setActiveTab(value)}
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
          className="size-[500px] border border-red-500"
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              {item.label} - 콘텐츠 {index}
            </SwiperSlide>
          ))}
        </Swiper>
      </TabsContent>

      {/* {items.map((item) => (
          <TabsContent key={item.value} value={item.value}>
            <Swiper
              key={item.value} // Swiper 재마운트 트리거
              initialSlide={items.findIndex((i) => i.value === activeTab)} // index 대신 value 기준
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                const newValue = items[swiper.activeIndex].value;
                setActiveTab(newValue);
              }}
              className="size-[500px] border border-red-500"
            >
              {items.map((item) => (
                <SwiperSlide key={item.value}>{item.label} - 콘텐츠</SwiperSlide>
              ))}
            </Swiper>
          </TabsContent>
        ))} */}
    </Tabs>
  );
}
