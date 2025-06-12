import BannerCarousel from "@/components/carousels/banner-carousel";
import DefaultSkeleton from "@/components/skeletons/DefaultSkeleton";
import PopularProductList from "@/components/popular-product-list";
import ProductSampleList from "@/components/product-sample-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="space-y-4">
      <section>
        <BannerCarousel />
      </section>

      <section>
        <Suspense fallback={<DefaultSkeleton />}>
          <PopularProductList />
        </Suspense>
      </section>

      <section>
        <Suspense fallback={<DefaultSkeleton />}>
          <ProductSampleList />
        </Suspense>
      </section>
    </main>
  );
}
