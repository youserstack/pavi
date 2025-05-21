import { CarouselList } from "@/components/carousel-list";
import { CarouselSlider } from "@/components/carousel-slider";
import ProductList from "@/components/product-list";

export default async function Home() {
  const products = await fetch(
    "https://express-server-pi-seven.vercel.app/api/products?sort=latest"
  ).then((res) => res.json());

  // console.log({ products });

  return (
    <main>
      <section>
        <CarouselSlider />
        <CarouselList products={products} />
      </section>
      <section className="/hidden">
        <ProductList products={products} />
      </section>
    </main>
  );
}
