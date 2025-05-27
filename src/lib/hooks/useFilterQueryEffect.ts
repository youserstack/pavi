import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";

export default function useFilterQueryEffect(filter: Filter) {
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const router = useRouter();

  // 필터스토어변경시 쿼리요청
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(filter).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.set(key, value.join(","));
      } else {
        params.set(key, value);
      }
    });
    queryClient.invalidateQueries({ queryKey: ["products"] });
    router.push(`?${params.toString()}`);
  }, [filter]);
}
