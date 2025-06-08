import ReviewTabLinkButton from "@/components/buttons/review-tab-link-button";
import { ProductDetailOrderForm } from "@/app/products/[productId]/product-detail-order-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function ProductDetailWidget() {
  return (
    <div
      className={cn(
        // 모바일에서는 순서변경
        "order-1 md:order-2 ",

        // 데스크탑에서는 스티키로 변경
        "md:h-[calc(100vh-40px)] md:sticky md:top-[40px]",

        "overflow-y-auto/ bg-sidebar"
      )}
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
            <ReviewTabLinkButton />

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
    </div>
  );
}
