import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useFilterStore } from "@/stores/useFilterStore";

export function useSyncFilterStoreWithQueryParams() {
  const { setFilter } = useFilterStore();
  const queryParams = useSearchParams();

  useEffect(() => {
    const category = queryParams.get("category")?.split(",");
    setFilter({ category });
  }, [queryParams]);
}
