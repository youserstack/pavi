import { getProducts } from "@/lib/api/fetchers";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

// 쿼리파라미터를 이용한 쿼리요청
export function useQueryProducts() {
  const searchParams = useSearchParams();
  const searchParamsObj = Object.fromEntries(searchParams.entries());
  // console.log({ searchParamsObj });

  return useQuery({
    queryKey: ["products", searchParamsObj],
    queryFn: () => getProducts(searchParamsObj),
  });
}
