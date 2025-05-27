import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFilterStore } from "@/stores/useFilterStore";

export default function useFilterQueryEffect() {
  const router = useRouter();
  const { filter } = useFilterStore();

  useEffect(() => {
    const urlSearchParams = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        urlSearchParams.set(key, value.join(","));
      }
    });
    const queryString = urlSearchParams ? `?${urlSearchParams.toString()}` : "";
    router.push(`/products${queryString}`);
  }, [filter]);
}
