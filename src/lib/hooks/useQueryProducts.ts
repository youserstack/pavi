import { getExistingSearchParams } from "@/lib/getExistingSearchParams";
import { useSearchParams } from "next/navigation";
import { getProducts } from "@/lib/api/fetchers";
import { useQuery } from "@tanstack/react-query";

export function useQueryProducts() {
  const searchParams = useSearchParams();
  const existingSearchParams = getExistingSearchParams(searchParams);
  const queryString = "?" + existingSearchParams.toString();

  return useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts(queryString),
  });
}
