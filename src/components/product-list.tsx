"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useQueryProducts } from "@/lib/hooks/useQueryProducts";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductList() {
  const { data, error, isPending, isError, isSuccess } = useQueryProducts();

  if (isPending || isError) {
    return (
      <>
        {isPending && <Skeleton className="rounded-lg flex-1 mb-4" />}
        {isError && toast(error.message)}
      </>
    );
  }

  if (isSuccess) {
    const { products, totalItems } = data;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <ul className="grid grid-cols-8 xs:grid-cols-12 sm:grid-cols-16 md:grid-cols-20 lg:grid-cols-24">
        {products?.map((product: any) => (
          <Link
            key={product.productId}
            href={`/products/${product._id}`}
            className="group col-span-4 border/"
          >
            <Image
              src={product.image || spareImageUrl}
              alt={""}
              width={700}
              height={700}
              className="/w-full aspect-[7/8] object-cover group-hover:opacity-75"
            />
            <h3 className="mt-4 text-sm">{product.title}</h3>
            <p className="mt-1 text-lg font-medium">{product.price}</p>
          </Link>
        ))}
      </ul>
    );
  }
}

const spareImageUrl =
  "https://shopping-phinf.pstatic.net/main_4683155/46831553621.20240403112809.jpg";
