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

export function CarouselList({ products }: { products: Product[] }) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <Carousel
      opts={{
        align: "start",
        // auto: 슬라이드의 그룹 단위로 스크롤
        // 1,2,3,4,...: 해당하는 숫자 단위만큼 슬라이드 스크롤
        slidesToScroll: "auto",
      }}
      className="group bg-background"
    >
      <CarouselContent
        // margin left 로 슬라이드의 그룹 간의 간격조절가능
        className="-ml-0 /-ml-4 "
        // 드래그중 그래빙 커서로 변경하기 위해서 이벤트 처리
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
      >
        {products.map((product, index) => (
          <CarouselItem
            key={index}
            // padding left 로 간격조절가능
            className="basis-1/2 xs:basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 pl-0 /pl-4"
          >
            <Item product={product} isDragging={isDragging} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden group-hover:flex left-4 md:left-6 lg:left-8" />
      <CarouselNext className="hidden group-hover:flex right-4 md:right-6 lg:right-8" />
    </Carousel>
  );
}

function Item({ product, isDragging }: { product: Product; isDragging: boolean }) {
  const { items, isInWishlist, removeFromWishlist, addToWishlist } = useWishlistStore();
  const [isWished, setIsWished] = useState(false);

  // 리로드시, 아이템리스트변경시 -> 위시리스트상태변경 -> 구독중인UI스타일변경
  useEffect(() => {
    setIsWished(isInWishlist(product.productId));
  }, [product.productId, isInWishlist, items]);

  return (
    <Link
      href={"#"}
      onClick={(e) => e.preventDefault()}
      className={isDragging ? "cursor-grabbing" : ""}
    >
      <div className="border/">
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
            className={`absolute bottom-4 right-4 size-4 
           stroke-red-500 hover:fill-red-500
             ${isWished ? "fill-red-500" : ""}
           `}
            onClick={(e) => {
              e.preventDefault();

              if (isInWishlist(product.productId)) {
                removeFromWishlist(product.productId);
              } else {
                addToWishlist({
                  id: product.productId,
                  name: product.title,
                  image: product.image,
                  price: product.price,
                });
              }
            }}
          />
        </div>

        {/* 설명 */}
        <div className="p-2">
          <p className="text-[11px] md:text-[12px] font-semibold">{product.brand}</p>
          <p className="text-[12px] md:text-[13px]">
            {/* 원 드라이핏 자켓 W - 블랙:화이트 / HQ3368-010 */}
            {product.title}
          </p>
          <p className="text-[12px] md:text-[13px] font-semibold flex gap-1">
            <span className="text-red-600 dark:text-red-500">12%</span>
            <span>23,500원</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
