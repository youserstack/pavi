"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { cn } from "@/lib/utils";
// import "swiper/css/bundle";

export default function ThumbsCarousel({
  items,
  className,
}: {
  items: { image: string }[];
  className?: {
    swiper?: string;
    swiperSlide?: string;
    thumbSwiper?: string;
    thumbSwiperSlide?: string;
  };
}) {
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="overflow-hidden ">
      <Swiper
        // Swiper가 초기화될 때 메인 Swiper 인스턴스를 ref에 저장
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          if (thumbsSwiper) {
            // 메인 슬라이드 변경 시 썸네일 슬라이더도 중앙에 해당하는 인덱스로 이동
            thumbsSwiper.slideTo(
              swiper.realIndex - Math.floor((thumbsSwiper.params.slidesPerView as number) / 2),
              300,
              true
            );
          }
        }}
        // style={
        //   {
        //     "--swiper-navigation-color": "#fff",
        //     "--swiper-pagination-color": "#fff",
        //   } as React.CSSProperties
        // }
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cn(
          "[&_.swiper-button-prev]:text-primary!",
          "[&_.swiper-button-next]:text-primary!",
          className?.swiper
        )}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} className={cn("mx-auto", className?.swiperSlide)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cn(
          "py-2! [&_.swiper-slide-thumb-active_div]:border-primary",
          className?.thumbSwiper
        )}
      >
        {items.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item.image} className={cn(className?.thumbSwiperSlide)} />
            <div className="absolute inset-0 border-2 border-transparent"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
