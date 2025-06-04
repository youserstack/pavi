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
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/stores/useWishlistStore";
import useDraggingState from "@/lib/hooks/useDraggingState";
import { cn } from "@/lib/utils";

export function ProductListCarousel({ products }: { products: Product[] }) {
  const { isDragging, setIsDragging } = useDraggingState();

  return (
    <Carousel
      opts={{ align: "start", slidesToScroll: "auto" }}
      onPointerDown={() => setIsDragging(true)}
      className={cn("group bg-background", isDragging ? "[&_a]:cursor-grabbing" : "")}
    >
      <CarouselContent className="-ml-0 ">
        {products?.map((product, index) => (
          <CarouselItem
            key={index}
            className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0"
          >
            <Item product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden group-hover:flex left-4 md:left-6 lg:left-8" />
      <CarouselNext className="hidden group-hover:flex right-4 md:right-6 lg:right-8" />
    </Carousel>
  );
}

function Item({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlistStore();

  const handleClick = () => {
    toggleWishlist({
      id: product.productId,
      name: product.title,
      image: product.image,
      price: product.price,
    });
  };

  return (
    <Link href={"#"} onClick={(e) => e.preventDefault()}>
      {/* 이미지 */}
      <div className="relative">
        <Image
          src={product.image}
          alt=""
          width={500}
          height={500}
          className="object-cover aspect-square"
        />
        <Heart
          onClick={handleClick}
          className={cn(
            "absolute bottom-4 right-4 size-4",
            "stroke-red-500 hover:fill-red-500",
            isInWishlist(product.productId) ? "fill-red-500" : ""
          )}
        />
      </div>

      {/* 설명 */}
      <div className="p-2">
        <p className="text-[11px] md:text-[12px] font-semibold">{product.brand}</p>
        <p className="text-[12px] md:text-[13px]">{product.title}</p>
        <p className="text-[12px] md:text-[13px] font-semibold flex gap-1">
          <span className="text-red-600 dark:text-red-500">12%</span>
          <span>23,500원</span>
        </p>
      </div>
    </Link>
  );
}
