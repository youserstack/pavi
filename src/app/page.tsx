"use client";

import { CarouselList } from "@/components/carousel-list";
import { CarouselSlider } from "@/components/carousel-slider";
import ProductList from "@/components/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getProducts } from "@/lib/api/fetchers";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  // const { data: products, status } = useQuery({
  //   queryKey: ["products"],
  //   queryFn: getProducts,
  // });

  // console.log({ products });

  // if (status === "pending") {
  //   return (
  //     <main>
  //       <section className="w-full h-screen flex justify-center items-center">
  //         <Skeleton className="w-full h-[calc(100%-2rem)] rounded-lg" />
  //       </section>
  //     </main>
  //   );
  // }

  // if (status === "success") {
  //   return (
  //     <main>
  //       <section>
  //         <CarouselSlider />
  //       </section>

  //       <section className="bg-muted space-y-8">
  //         <div className=" space-y-8">
  //           <div>
  //             <h1 className="ml-3 mb-3 font-semibold">구매가 많은 제품들</h1>
  //             <CarouselList products={products} />
  //           </div>

  //           <div>
  //             <h1 className="ml-3 mb-3 font-semibold">전체 상품</h1>
  //             <ProductList products={products} />
  //           </div>
  //         </div>
  //       </section>
  //     </main>
  //   );
  // }

  return null;
}
