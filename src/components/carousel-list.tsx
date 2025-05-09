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

export function CarouselList() {
  return (
    <Carousel opts={{ align: "start", slidesToScroll: "auto" }} className="group">
      <CarouselContent className="-ml-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-4"
          >
            <Link href={"#"}>
              <div className="border">
                <Image
                  src={imageUrl}
                  alt=""
                  width={500}
                  height={500}
                  className="w-full object-cover aspect-square"
                />

                <p>나이키</p>
                <p className="text-xs">원 드라이핏 자켓 W - 블랙:화이트 / HQ3368-010</p>
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
