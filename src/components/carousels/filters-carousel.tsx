"use client";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColorFilter3 } from "@/components/filters/color-filter-3";
import { BrandFilter } from "@/components/filters/brand-filter";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { Swiper, SwiperSlide } from "swiper/react";
import { filterItems } from "@/data/filter-items";
import { useRef, useState } from "react";
import SwiperCore from "swiper";
import "swiper/css";
import { CommonCheckboxFilter } from "@/components/filters/common-checkbox-filter";
import { ColorFilter } from "@/components/filters/color-filter";
import {
  bgColorMap,
  bgLightColors,
  brandOptions,
  colorOptions,
  priceOptions,
  productTypeOptions,
  sizeOptions,
} from "@/data/filter-options";
import { cn } from "@/lib/utils";
import { CommonRadioGroupFilter } from "@/components/filters/common-radio-group-filter";

export default function FiltersCarousel() {
  const { isDragging, setIsDragging } = useDraggingState();
  const [activeTab, setActiveTab] = useState<string>(filterItems[0]?.value); // 초기 탭 값 설정
  const swiperRef = useRef<SwiperCore>(null);

  const renderFilterComponent = (value: string) => {
    switch (value) {
      case "brand":
        return <CommonCheckboxFilter name="brand" options={brandOptions} />;
      case "size":
        return <CommonCheckboxFilter name="size" options={sizeOptions} />;
      case "color":
        return (
          <CommonCheckboxFilter
            name="color"
            options={colorOptions}
            checkboxClassName={(option, checked) =>
              cn(
                "rounded-full size-5",
                bgColorMap[option.value],
                bgLightColors.includes(option.value) ? "text-black" : "text-white"
              )
            }
          />
        );
      case "price":
        return <CommonRadioGroupFilter name="price" options={priceOptions} />;
      case "productType":
        return <CommonCheckboxFilter name="productType" options={productTypeOptions} />;
      default:
        return null;
    }
  };

  return (
    <div
      onPointerDown={() => setIsDragging(true)}
      className={`flex-1 flex flex-col min-h-0
      ${isDragging ? "[&_button]:cursor-grabbing" : "[&_button]:cursor-pointer"} `}
    >
      {/* 탭 버튼 리스트 */}
      <Carousel>
        <CarouselContent className="-ml-0">
          {filterItems.map((item) => (
            <button
              key={item.value}
              onClick={() => {
                setActiveTab(item.value);
                const index = filterItems.findIndex((i) => i.value === item.value);
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

      {/* 탭 컨텐트 */}
      <Swiper
        className="size-full" // 스와이프 루트에 가로, 높이 명시
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          const newIndex = swiper.realIndex;
          const newTab = filterItems[newIndex]?.value;
          if (newTab) setActiveTab(newTab);
        }}
      >
        {filterItems.map((item, index) => (
          <SwiperSlide key={index}>
            <ScrollArea
              className="h-full px-2 py-4 " // 스크롤 루트에 높이 명시
            >
              {renderFilterComponent(item.value)}
            </ScrollArea>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
