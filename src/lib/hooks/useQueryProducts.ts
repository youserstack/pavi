import { getProducts } from "@/lib/api/fetchers";
import { useFilterStore } from "@/stores/useFilterStore";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export function useQueryProducts() {
  const searchParams = useSearchParams();
  const queryString = "?" + searchParams.toString();
  // console.log({ queryString });

  const { filter, setCategory } = useFilterStore();

  return useQuery({
    // queryKey: ["products", filter],
    queryKey: ["products", queryString],
    queryFn: () => getProducts(queryString),
  });
}
