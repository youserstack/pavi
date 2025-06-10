import { ToggleButtonCarousel } from "@/components/carousels/toggle-button-carousel";
import CategoryTabsCarousel from "@/components/carousels/category-tabs-carousel";
import FilterButton from "@/components/buttons/filter-button";
import ProductList from "@/components/product-list";
import { keywordItems } from "@/data/filter-items";
import { Suspense } from "react";

export default function ProductsPage() {
  return (
    <main>
      <section className="min-h-screen flex flex-col gap-4">
        <Suspense>
          {/* 탭버튼 */}
          <CategoryTabsCarousel />

          {/* 필터버튼 */}
          <div className="flex items-center gap-3">
            <FilterButton />
            <ToggleButtonCarousel type="suggestions" items={keywordItems} />
          </div>

          {/* 제품리스트 */}
          <ProductList />
        </Suspense>
      </section>
    </main>
  );
}
