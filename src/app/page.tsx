import SlideBanner from "@/components/slide-banner";
import PopularProductSuggestion from "@/components/popular-product-suggestion";
import ProductSampleList from "@/components/product-sample-list";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  return (
    <main>
      <section className="min-h-screen flex flex-col gap-4">
        {/* 서버에서 정적 렌더링되고 동적기능은 하이드레이션되는 클라이언트컴포넌트 */}
        <SlideBanner />

        {/* 서버에서 렌더링하여 스트리밍되는 서버컴포넌트, 스트리밍되기까지 임시 스켈레톤 서버컴포넌트 */}
        <Suspense fallback={<Skeleton className="h-[250px] rounded-lg my-4" />}>
          <PopularProductSuggestion />
        </Suspense>
        <Suspense fallback={<Skeleton className="h-[250px] rounded-lg my-4" />}>
          <ProductSampleList />
        </Suspense>
      </section>
    </main>
  );
}
