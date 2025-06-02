import { ToggleButtonCarousel } from "@/components/carousels/toggle-button-carousel";
import FilterButton from "@/components/buttons/filter-button";
import TabButtonCarousel1 from "@/components/carousels/tab-button-carousel-1";
import TabButtonCarousel2 from "@/components/carousels/tab-button-carousel-2";
import ProductList from "@/components/product-list";
import { categoryFilterItems } from "@/data/filterItems";

export default function ProductsPage() {
  return (
    <main>
      <section className="min-h-screen space-y-10">
        {/* 탭버튼 */}
        <TabButtonCarousel1 />

        {/* 필터버튼 */}
        <div className="flex items-center gap-3">
          <FilterButton />
          <ToggleButtonCarousel type="category" items={categoryFilterItems} />
        </div>

        {/* 제품리스트 */}
        {/* <ProductList /> */}
        {/* <ClientPagination page={page} totalPages={totalPages} /> */}
      </section>
    </main>
  );
}
