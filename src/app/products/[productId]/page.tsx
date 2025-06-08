import ProductImageCard from "@/app/products/[productId]/product-image-card";
// import { BreadcrumbWithSeparator } from "@/components/breadcrumb-with-separator";
import ProductInfoCard from "@/app/products/[productId]/product-info-card";
import WidgetCard from "@/app/products/[productId]/widget/widget-card";
import { DefaultCarousel } from "@/components/carousels/default-carousel";
import ProductDetailTabsCarousel from "@/components/carousels/product-detail-tabs-carousel";
import ThumbsCarousel from "@/components/carousels/thumbs-carousel";
import { ProductDetailOrderForm } from "@/components/product-detail-order-form";
import { ProductImage } from "@/components/product-image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getProduct, getProductIds } from "@/lib/api/fetchers";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

// export const revalidate = 30; // 재검증시간설정 : n초동안캐시

// export async function generateStaticParams() {
//   const data = await getProductIds();
//   const productIds = data.productIds.map((v: any) => ({ productId: v.productId }));
//   console.log({ productIds });
//   return productIds;
// }

type Params = Promise<{ productId: string }>;

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { product } = await getProduct((await params).productId);
  const productId = (await params).productId;
  console.log({ productId, product });

  if (!product) return null;

  return (
    <main>
      <section>
        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ProductImageCard src={product.image} />

          <div className="flex flex-col gap-4 sm:gap-6">
            <ProductInfoCard product={product} />
            <WidgetCard product={product} />
          </div>
        </div> */}

        <div className="flex gap-4 py-4">
          {/* 좌측 */}
          <div className="w-[65%] /flex-[6.5] min-h-[calc(100vh-40px)]">
            <ThumbsCarousel
              items={Array.from({ length: 10 }).map((_, i) => ({
                image:
                  "https://image.msscdn.net/thumbnails/images/prd_img/20250310/4876181/detail_4876181_17419318496874_big.jpg?w=1200",
              }))}
            />
            <ProductDetailTabsCarousel />

            {Array.from({ length: 30 }).map((v, i) => (
              <p key={i}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima quis animi
                doloribus quasi eos? Illum quaerat culpa eos eum ullam facere, magnam nesciunt?
                Pariatur mollitia voluptatibus cupiditate tempore excepturi esse.
              </p>
            ))}
          </div>

          {/* 우측 */}
          {/* <div
            className="w-[35%] h-[calc(100vh-40px)] 
            sticky top-[40px] overflow-y-auto bg-sidebar"
          >
            <ScrollArea className="h-full p-4">
              <div className="flex flex-col gap-4">
                <Link href={"#"} className="flex items-center gap-2">
                  <Avatar className="size-6">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>

                  <span className="text-sm font-semibold">나이키</span>
                </Link>

                <h1 className="text-lg font-bold">아이폰 16 프로 256GB [자급제]</h1>

                <div className="flex items-center justify-between">
                  <Link href={""} className="text-xs inline-flex gap-2">
                    <span className="inline-flex gap-1">
                      <IoIosStar className="text-amber-500 text-sm" />
                      <span className="font-semibold ">4.3</span>
                    </span>

                    <span className="underline">리뷰 300개</span>
                  </Link>

                  <span className="text-xs font-semibold inline-flex items-center gap-1">
                    <span className="text-red-600 dark:text-red-500 flex flex-col">
                      <span>할인가</span>
                      <span className="text-lg">12%</span>
                    </span>
                    <span className="flex flex-col">
                      <span className="line-through">23,500원</span>
                      <span className="text-lg">23,500원</span>
                    </span>
                  </span>
                </div>

                <ProductDetailOrderForm />
              </div>
            </ScrollArea>
          </div> */}
        </div>
      </section>
    </main>
  );
}
