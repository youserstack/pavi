"use client";

import ProductItem from "@/components/items/product-item";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryProducts } from "@/lib/hooks/useQueryProducts";
import { toast } from "sonner";

export default function ProductList() {
  const { data, error, isPending, isError, isSuccess } = useQueryProducts();

  if (isPending || isError) {
    return (
      <>
        {isPending && <Skeleton className="h-[250px] rounded-lg flex-1 my-4" />}
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
        {products?.map((product: Product) => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </ul>
    );
  }
}
