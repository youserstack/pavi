import { CarouselList } from "@/components/carousel-list";
import { CarouselSlider } from "@/components/carousel-slider";
import ProductList from "@/components/ProductList";
import { ScrollAreaHorizontalDemo } from "@/components/ScrollAreaHorizontalDemo";

export default function Home() {
  return (
    <main>
      <section className="hidden">
        {/* <ProductList /> */}
        {/* <ScrollAreaHorizontalDemo /> */}
      </section>

      <section>
        {/* <CarouselSlider /> */}
        <CarouselList />
      </section>
    </main>
  );
}
