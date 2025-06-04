import ProductItem from "@/components/items/product-item";
import { getProducts } from "@/lib/api/fetchers";

export default async function ProductSampleList() {
  const { products } = await getProducts();

  return (
    <div>
      <h1 className="ml-3 mb-3 font-semibold">제품 리스트</h1>
      <ul className="grid grid-cols-8 xs:grid-cols-12 sm:grid-cols-16 md:grid-cols-20 lg:grid-cols-24">
        {products?.map((product: Product) => (
          <ProductItem key={product.productId} product={product} />
        ))}
      </ul>
    </div>
  );
}
