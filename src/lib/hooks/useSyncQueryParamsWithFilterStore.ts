import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/stores/useFilterStore";

export default function useSyncQueryParamsWithFilterStore() {
  const { filter } = useFilterStore();
  const router = useRouter();

  useEffect(() => {
    const queryParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        queryParams.set(key, value.join(","));
      }
    });
    const queryString = queryParams ? `?${queryParams.toString()}` : "";
    router.push(`/products${queryString}`);
  }, [filter]);
}
