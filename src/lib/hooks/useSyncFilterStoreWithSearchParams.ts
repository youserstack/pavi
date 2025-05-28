import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFilterStore } from "@/stores/useFilterStore";

// 쿼리파라미터 ---동기화--> 필터스토어
export function useSyncFilterStoreWithSearchParams() {
  const { reloadFilter } = useFilterStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    // const category = searchParams.get("category")?.split(",");
    // setFilter({ category });
    let filter: { [key: string]: any } = {};
    searchParams.entries().forEach(([key, value]) => {
      if (value) {
        filter[key] = value.split(",");
      }
    });
    reloadFilter(filter);
  }, [searchParams]);
}
