import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { mockupProductImage } from "@/data/mockups";
import Image from "next/image";

export function DefaultCarousel() {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pl-0">
            <div className="p-1 /p-10 border">
              <Image
                src={mockupProductImage}
                alt=""
                width={300}
                height={300}
                className="size-full /w-full /h-[300px] object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-1/12" />
      <CarouselNext className="right-1/12" />
    </Carousel>
  );
}
