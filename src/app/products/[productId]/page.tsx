import ProductImageCard from "@/app/products/[productId]/product-image-card";
// import { BreadcrumbWithSeparator } from "@/components/breadcrumb-with-separator";
import ProductInfoCard from "@/app/products/[productId]/product-info-card";
import WidgetCard from "@/app/products/[productId]/widget/widget-card";
import { getProduct, getProductIds } from "@/lib/api/fetchers";

// export const revalidate = 30; // 재검증시간설정 : n초동안캐시

export async function generateStaticParams() {
  const data = await getProductIds();
  const productIds = data.productIds.map((v: any) => ({ productId: v.productId }));
  console.log({ productIds });
  return productIds;
}

type Params = Promise<{ productId: string }>;

export default async function ProductDetailPage({ params }: { params: Params }) {
  const productId = (await params).productId;
  const { product } = await getProduct(productId);
  console.log({ productId, product });

  return (
    <main className="ProductDetailPage">
      <section>
        {/* <BreadcrumbWithSeparator category={product.category1} /> */}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ProductImageCard src={product.image} />

          <div className="flex flex-col gap-4 sm:gap-6">
            <ProductInfoCard product={product} />
            <WidgetCard product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
