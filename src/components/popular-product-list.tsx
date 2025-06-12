import { ProductListCarousel } from "@/components/carousels/product-list-carousel";
import { getProducts } from "@/lib/api/fetchers";

export default async function PopularProductList() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="ml-3 mb-3 font-semibold">구매가 많은 제품들</h1>
      <ProductListCarousel products={products} />
    </div>
  );
}
