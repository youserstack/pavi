"use client";

import { useWishlistStore } from "@/stores/useWishlistStore";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem({ product }: { product: Product }) {
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
    <Link
      href={`/products/${product.productId}`}
      className="col-span-4 hover:opacity-85 transition"
    >
      {/* 이미지 */}
      <div className="relative ">
        <Image
          src={product.image}
          alt=""
          width={500}
          height={500}
          className="object-cover aspect-square "
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
