"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useState } from "react";

export function CarouselList() {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Carousel opts={{ align: "start", slidesToScroll: "auto" }} className="group">
      <CarouselContent
        className="-ml-0 /-ml-4 "
        // 드래그중 그래빙 커서로 변경하기 위해서 이벤트 처리
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0 /pl-4"
          >
            <Link href={"#"} className={isDragging ? "cursor-grabbing" : ""}>
              <div className="border">
                <div>
                  <Image
                    src={imageUrl}
                    alt=""
                    width={500}
                    height={500}
                    className="w-full object-cover aspect-square"
                  />
                </div>
                <div className="p-2">
                  <p className="text-[11px] md:text-[12px] font-semibold">나이키</p>
                  <p className="text-[12px] md:text-[13px]">
                    원 드라이핏 자켓 W - 블랙:화이트 / HQ3368-010
                  </p>
                  <p className="text-[12px] md:text-[13px] font-semibold flex gap-1">
                    <span className="text-red-600 dark:text-red-500">12%</span>
                    <span>23,500원</span>
                  </p>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden group-hover:flex left-4 md:left-6 lg:left-8" />
      <CarouselNext className="hidden group-hover:flex right-4 md:right-6 lg:right-8" />
    </Carousel>
  );
}

const imageUrl = "https://shopping-phinf.pstatic.net/main_5025360/50253608620.20240910110137.jpg";
