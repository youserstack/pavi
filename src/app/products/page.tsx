import { ToggleButtonCarousel } from "@/components/carousels/toggle-button-carousel";
import FilterButton from "@/components/buttons/filter-button";
import ProductList from "@/components/product-list";
import { categoryFilterItems, keywordItems, tabsItems } from "@/data/filter-items";
import TabsCarousel from "@/components/carousels/tabs-carousel";

export default function ProductsPage() {
  return (
    <main>
      <section className="min-h-screen flex flex-col gap-4">
        {/* 탭버튼 */}
        <TabsCarousel />

        {/* 필터버튼 */}
        <div className="flex items-center gap-3">
          <FilterButton />
          <ToggleButtonCarousel type="suggestions" items={keywordItems} />
        </div>

        {/* 제품리스트 */}
        <ProductList />
        {/* <ClientPagination page={page} totalPages={totalPages} /> */}
      </section>
    </main>
  );
}
