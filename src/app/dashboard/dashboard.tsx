"use client";

import { ChartAreaInteractive } from "@/components/cart-area-interactive";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/table/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import { data } from "@/data/data";

export default function Dashboard() {
  return (
    <div className="☑️Dashboard w-full mt-[40px]">
      <SidebarProvider>
        {/* 대시보드 사이드바 */}
        <AppSidebar variant="inset" />

        {/* 대시보드 본문 */}
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                {/* 카드 리스트 */}
                <SectionCards />

                {/* 차트 */}
                <div className="px-4 lg:px-6">
                  <ChartAreaInteractive />
                </div>

                {/* 테이블 */}
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
