import { CarouselList } from "@/components/carousel-list";
import { CarouselSlider } from "@/components/carousel-slider";
import ProductList from "@/components/product-list";
import { ScrollAreaHorizontalDemo } from "@/components/ScrollAreaHorizontalDemo";

export default async function Home() {
  const products = await fetch(
    "https://express-server-pi-seven.vercel.app/api/products?sort=latest"
  ).then((res) => res.json());

  console.log({ products });

  return (
    <main>
      <section className="hidden">
        {/* <ProductList products={products} /> */}
        {/* <ScrollAreaHorizontalDemo /> */}
      </section>

      <section>
        {/* <CarouselSlider /> */}
        <CarouselList products={products} />
      </section>
    </main>
  );
}
