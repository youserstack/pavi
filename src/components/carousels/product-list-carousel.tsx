"use client";

import ProductItem from "@/components/items/product-item";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { cn } from "@/lib/utils";

export function ProductListCarousel({ products }: { products: Product[] }) {
  const { isDragging, setIsDragging } = useDraggingState();

  return (
    <Carousel
      opts={{ align: "start", slidesToScroll: "auto", dragFree: true }}
      onPointerDown={() => setIsDragging(true)}
      className={cn("group bg-background", isDragging ? "[&_a]:cursor-grabbing" : "")}
    >
      <CarouselContent className="-ml-0 ">
        {products?.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0"
          >
            <ProductItem product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden group-hover:flex left-4 md:left-6 lg:left-8" />
      <CarouselNext className="hidden group-hover:flex right-4 md:right-6 lg:right-8" />
    </Carousel>
  );
}
