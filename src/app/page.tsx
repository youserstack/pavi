import PopularProductSuggestion from "@/components/popular-product-suggestion";
import { SlideBanner } from "@/components/slide-banner";
import ProductList from "@/components/product-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen space-y-8">
        <SlideBanner />

        {/* <Suspense fallback={<Skeleton className="h-[250px] rounded-lg" />}>
          <PopularProductSuggestion />
        </Suspense> */}

        {/* <Suspense fallback={<Skeleton className="h-[250px] rounded-lg" />}>
          <ProductList />
        </Suspense> */}
      </section>
    </main>
  );
}
