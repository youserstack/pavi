import BannerCarousel from "@/components/carousels/banner-carousel";
import DefaultSkeleton from "@/components/skeletons/DefaultSkeleton";
import PopularProductList from "@/components/popular-product-list";
import ProductSampleList from "@/components/product-sample-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="space-y-4">
      <section>
        {/* 서버에서 정적 렌더링되고 동적기능은 하이드레이션되는 클라이언트컴포넌트 */}
        <BannerCarousel />
      </section>

      {/* 서버에서 렌더링하여 스트리밍되는 서버컴포넌트, 스트리밍되기까지 임시 스켈레톤 서버컴포넌트 */}

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
