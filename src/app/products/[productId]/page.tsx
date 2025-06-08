import ProductDetailTabsCarousel from "@/components/carousels/product-detail-tabs-carousel";
import ProductDetailWidget from "@/app/products/[productId]/product-detail-widget";
import { getProduct, getProductIds } from "@/lib/api/fetchers";
import ThumbsCarousel from "@/components/carousels/thumbs-carousel";
import { mockupTextElements } from "@/data/mockups";

// export const revalidate = 30; // 재검증시간설정 : n초동안캐시

// export async function generateStaticParams() {
//   const data = await getProductIds();
//   const productIds = data.productIds.map((v: any) => ({ productId: v.productId }));
//   console.log({ productIds });
//   return productIds;
// }

type Params = Promise<{ productId: string }>;

export default async function ProductDetailPage({ params }: { params: Params }) {
  const product = await getProduct((await params).productId);
  console.log({ product });

  if (!product) return null;

  return (
    <main>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-4 py-4">
          {/* 좌측 */}
          <div
            className="order-2 md:order-1 
            min-h-[calc(100vh-40px)]"
          >
            <ThumbsCarousel
              items={Array.from({ length: 10 }).map((_, i) => ({
                image: product.image,
              }))}
            />
            <ProductDetailTabsCarousel />
            {/* {mockupTextElements} */}
          </div>

          {/* 우측 위젯으로 가격, 주문옵션, 할인, 배송정보 등... */}
          <ProductDetailWidget />
        </div>
      </section>
    </main>
  );
}
