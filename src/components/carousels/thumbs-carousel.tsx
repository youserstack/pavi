"use client";

import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import "swiper/css/bundle";

export default function ThumbsCarousel() {
  const mainSwiperRef = useRef<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="overflow-hidden">
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
        className=" 
        [&_.swiper-button-prev]:text-white!
        [&_.swiper-button-next]:text-white!
        "
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <SwiperSlide key={i}>
            <img src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`} />
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
        className="py-2! [&_.swiper-slide-thumb-active_div]:border-black"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <SwiperSlide key={i} className="relative cursor-pointer">
            <img src={`https://swiperjs.com/demos/images/nature-${i + 1}.jpg`} />
            <div className="absolute inset-0 border-2 border-transparent"></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
