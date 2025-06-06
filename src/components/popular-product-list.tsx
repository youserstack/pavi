import { ProductListCarousel } from "@/components/carousels/product-list-carousel";
import { getProducts } from "@/lib/api/fetchers";

export default async function PopularProductList() {
  const { products } = await getProducts();

  return (
    <div>
      <h1 className="ml-3 mb-3 font-semibold">구매가 많은 제품들</h1>
      <ProductListCarousel products={products} />
    </div>
  );
}

// "use client";

// import { ProductListCarousel } from "@/components/product-carousel-bar";
// import { Skeleton } from "@/components/ui/skeleton";
// import { getProducts } from "@/lib/api/fetchers";
// import { useQuery } from "@tanstack/react-query";

// export default function PopularProductList() {
//   const { data, error, isPending, isError } = useQuery({
//     queryKey: ["mock-products"],
//     queryFn: () => getProducts(),
//   });
//   console.log({ data });

//   if (isPending || isError) {
//     return (
//       <div className="size-full py-2 sm:py-3 lg:py-4">
//         {isPending && <Skeleton className="size-full rounded-lg" />}
//         {isError && error.message}
//       </div>
//     );
//   }

//   const { products, totalItems } = data;

//   return (
//     <div>
//       <h1 className="ml-3 mb-3 font-semibold">구매가 많은 제품들</h1>
//       <ProductListCarousel products={products} />
//     </div>
//   );
// }
