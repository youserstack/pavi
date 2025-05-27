import { getProducts } from "@/lib/api/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useFilterStore } from "@/stores/useFilterStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useQueryProducts() {
  // 스토어에서 필터객체를 가지고와서 쿼리스트링을 생성
  const params = new URLSearchParams();
  const { filter } = useFilterStore();
  Object.entries(filter).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      params.set(key, value.join(","));
    }
  });
  const queryString = "?" + params.toString();
  // console.log({ queryString });

  // 클라이언트 브라우저 url 동기화
  const router = useRouter();
  useEffect(() => {
    router.replace("/products" + queryString);
  }, [filter]);

  return useQuery({
    queryKey: ["products", filter],
    queryFn: () => getProducts(queryString),
  });
}
