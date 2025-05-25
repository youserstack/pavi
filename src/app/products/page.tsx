"use client";

import CarouselTabsV1 from "@/components/carousel-tabs-v1";
import CarouselTabsV2 from "@/components/carousel-tabs-v2";
import ProductList from "@/components/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/api/fetchers";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useSwiper } from "swiper/react";

interface Data {
  products: Product[];
  totalItems: number;
}

export default function ProductsPage() {
  // const searchParams = useSearchParams();
  // const params = useQueryParams(searchParams);
  // const url = `${process.env.TEMP_API_URL2}/api/products?${params.toString()}`;

  // const { data, status } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: () => getProducts(url),
  // });

  // if (status === "pending") {
  //   return (
  //     <main>
  //       <section>
  //         <Skeleton className="w-full h-[calc(100%-2rem)] rounded-lg" />
  //       </section>
  //     </main>
  //   );
  // }

  // if (status === "success") {
  //   const { products, totalItems } = data as Data;
  //   const itemsPerPage = 10;
  //   const totalPages = Math.ceil(totalItems / itemsPerPage);
  //   console.log({ products });

  //   return (
  //     <main>
  //       <section className="min-h-screen space-y-10">
  //         <CarouselTabsV2 />
  //         {/* <CarouselTabsV1 items={items} /> */}
  //         {/* <ProductList products={products} /> */}
  //         {/* <ClientPagination page={page} totalPages={totalPages} /> */}
  //       </section>
  //     </main>
  //   );
  // }

  // return null;

  return (
    <main>
      <section>
        <CarouselTabsV1 items={items} />
        {/* <CarouselTabsV2 items={items} /> */}
      </section>
    </main>
  );
}

const items = [
  { value: "sweatshirts", label: "맨투맨/스웨트셔츠" },
  { value: "t-shirts", label: "반팔/긴팔 티셔츠" },
  { value: "pants", label: "바지" },
  { value: "shorts", label: "반바지" },
  { value: "shirts", label: "셔츠/블라우스" },
  { value: "outerwear", label: "아우터/점퍼" },
  { value: "hoodies", label: "후드티" },
  { value: "knitwear", label: "니트/스웨터" },
  { value: "jackets", label: "자켓" },
  { value: "coats", label: "코트" },
  { value: "skirts", label: "스커트" },
  { value: "dresses", label: "원피스" },
  { value: "suits", label: "정장/수트" },
];
