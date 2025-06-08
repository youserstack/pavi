"use client";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  // 메인, 섬네일 상태관리
  const mainSwiperRef = useRef<SwiperType | null>(null); // 참조만을 위한거라서 useRef로 상태관리
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  // 다이얼로그 상태관리
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div>
      {/* 메인 슬라이더 */}
      <Swiper
        // Swiper가 초기화될 때 메인 Swiper 인스턴스를 ref에 저장
        onSwiper={(swiper) => (mainSwiperRef.current = swiper)}
        // 메인 슬라이드 변경시 썸네일 슬라이더도 중앙에 해당하는 인덱스로 이동
        onSlideChange={(swiper) => {
          if (thumbsSwiper) {
            thumbsSwiper.slideTo(
              swiper.realIndex - Math.floor((thumbsSwiper.params.slidesPerView as number) / 2),
              300,
              true
            );
          }
        }}
        spaceBetween={0}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cn(
          "[&_.swiper-button-prev]:text-zinc-700!",
          "[&_.swiper-button-next]:text-zinc-700!",
          className?.swiper
        )}
      >
        {items.map((item, index) => (
          <SwiperSlide
            key={index}
            // 클릭시 다이얼로그 슬라이더 열기
            onClick={() => {
              setSelectedIndex(index);
              setIsDialogOpen(true);
            }}
          >
            <img src={item.image} className={cn("mx-auto", className?.swiperSlide)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 섬네일 슬라이더 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={cn(
          "py-2! [&_.swiper-slide-thumb-active_div]:border-zinc-700",
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

      {/* 다이얼로그 슬라이더 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className={cn(
            // 오버라이딩
            "p-0 border-none rounded-none max-w-none!",
            "size-full flex gap-0",

            // 닫기버튼
            "[&_button]:z-[100] md:[&_button]:right-[calc(14.29%+1rem)]"
          )}
        >
          {/* 컴포넌트 필수항목이지만 표시할 필요없어서 히든처리 */}
          <DialogTitle className="hidden"></DialogTitle>

          {/* 
              다이얼로그 오버레이를 커스텀하고싶었지만 특정할수 없어서 
              다이얼로그컨텐트의 자식요소 디스플레이를 플렉스처리하고
              좌우에 블랙영역을 두고 닫기처리를 할수있도록함
          */}
          <div
            className="hidden md:block flex-1 bg-zinc-900 "
            onClick={() => setIsDialogOpen(false)}
          />

          <Swiper
            initialSlide={selectedIndex}
            navigation
            modules={[FreeMode, Navigation]}
            onSlideChange={(swiper) => mainSwiperRef?.current?.slideTo(swiper.realIndex)}
            className={cn(
              "flex-5",
              "[&_.swiper-button-prev]:text-zinc-700!",
              "[&_.swiper-button-next]:text-zinc-700!"
            )}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index} onClick={(e) => e.stopPropagation()}>
                <img src={item.image} className="size-full object-contain" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div
            className="hidden md:block flex-1 bg-zinc-900 "
            onClick={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
