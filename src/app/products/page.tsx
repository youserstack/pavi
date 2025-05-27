"use client";

import CarouselTabsV1 from "@/components/carousel-tabs-v1";
import CarouselTabsV2 from "@/components/carousel-tabs-v2";
import FilterBar from "@/components/filter-bar";
import ProductList from "@/components/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryProducts } from "@/lib/hooks/useQueryProducts";

export default function ProductsPage() {
  const { data, error, isPending, isError, isSuccess } = useQueryProducts();

  if (isPending || isError) {
    return (
      <main>
        <section>
          {isPending && <Skeleton className="w-full h-[calc(100%-2rem)] rounded-lg" />}
          {isError && <span>{error.message}</span>}
        </section>
      </main>
    );
  }

  if (isSuccess) {
    const { products, totalItems } = data as ProductQueryData;
    const itemsPerPage = 10;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    console.log({ products });

    return (
      <main>
        <section className="min-h-screen space-y-10">
          <FilterBar />

          {/* <CarouselTabsV2 /> */}
          {/* <CarouselTabsV1 items={items} /> */}
          <ProductList products={products} />
          {/* <ClientPagination page={page} totalPages={totalPages} /> */}
          {/* <div className="h-[500px]"></div> */}
          {/* <CarouselTabsV1 items={items} />
        <CarouselTabsV2 items={items} /> */}
        </section>
      </main>
    );
  }
}
