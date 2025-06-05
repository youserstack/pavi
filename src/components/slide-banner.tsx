"use client";

import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function SlideBanner() {
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        slidesToScroll: "auto",
        // slidesToScroll: 3,
        dragFree: true,
      }}
      plugins={[plugin.current]}
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
      className={cn(
        "group",
        "w-full h-[250px]",
        // 내부 속성 변경
        "[&_[data-slot='carousel-content']]:h-full"
      )}
    >
      <CarouselContent className="ml-0 h-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-0 h-full">
            <Image
              src={imageUrl}
              alt=""
              width={500}
              height={500}
              className="size-full object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden group-hover:flex left-4 md:left-6 lg:left-8" />
      <CarouselNext className="hidden group-hover:flex right-4 md:right-6 lg:right-8" />
    </Carousel>
  );
}

const imageUrl = "https://shopping-phinf.pstatic.net/main_5025360/50253608620.20240910110137.jpg";
