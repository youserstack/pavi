import CarouselTabsV1 from "@/components/carousel-tabs-v1";
import CarouselTabsV2 from "@/components/carousel-tabs-v2";
import FilterBar from "@/components/filter-bar";
import ProductList from "@/components/product-list";

export default function ProductsPage() {
  return (
    <main>
      <section className="min-h-screen space-y-10">
        <FilterBar />
        <ProductList />

        {/* <CarouselTabsV2 /> */}
        {/* <CarouselTabsV1 items={items} /> */}
        {/* <ClientPagination page={page} totalPages={totalPages} /> */}
        {/* <div className="h-[500px]"></div> */}
        {/* <CarouselTabsV1 items={items} />
      <CarouselTabsV2 items={items} /> */}
      </section>
    </main>
  );
}
