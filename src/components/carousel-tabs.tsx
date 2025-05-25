"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useState } from "react";

export function CarouselTabs({ items }: { items: [] }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Carousel
      opts={{
        align: "start",
        // auto: 슬라이드의 그룹 단위로 스크롤
        // 1,2,3,4,...: 해당하는 숫자 단위만큼 슬라이드 스크롤
        slidesToScroll: "auto",
      }}
      className="group bg-background"
    >
      <CarouselContent
        // margin left 로 슬라이드의 그룹 간의 간격조절가능
        className="-ml-0 /-ml-4 "
        // 드래그중 그래빙 커서로 변경하기 위해서 이벤트 처리
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        <CarouselItem className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0 /pl-4">
          <p>111</p>
        </CarouselItem>
        <CarouselItem className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0 /pl-4">
          <p>222</p>
        </CarouselItem>
        <CarouselItem className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0 /pl-4">
          <p>333</p>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
