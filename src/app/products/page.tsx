"use client";

import ProductList from "@/components/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/api/fetchers";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface Data {
  products: Product[];
  totalItems: number;
}

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const params = useQueryParams(searchParams);
  const url = `${process.env.TEMP_API_URL2}/api/products?${params.toString()}`;

  const { data, status } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(url),
  });

  if (status === "pending") {
    return (
      <main>
        <section>
          <Skeleton className="w-full h-[calc(100%-2rem)] rounded-lg" />
        </section>
      </main>
    );
  }

  if (status === "success") {
    const { products, totalItems } = data as Data;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    console.log({ products });

    return (
      <main>
        <section className="min-h-screen space-y-10">
          <ProductList products={products} />

          {/* <ClientPagination page={page} totalPages={totalPages} /> */}
        </section>
      </main>
    );
  }

  return null;
}
