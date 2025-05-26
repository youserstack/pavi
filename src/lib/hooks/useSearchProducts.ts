import { getProducts } from "@/lib/api/fetchers";
import { useQueryParams } from "@/lib/hooks/useQueryParams";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useSearchProducts() {
  const searchParams = useSearchParams();
  const queryParams = useQueryParams(searchParams);
  const queryString = "?" + queryParams.toString();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(queryString),
  });
}
