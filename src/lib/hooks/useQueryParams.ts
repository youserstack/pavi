import { ReadonlyURLSearchParams } from "next/navigation";

export function useQueryParams(searchParams: ReadonlyURLSearchParams): URLSearchParams {
  const query = searchParams.get("query");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");
  const params = new URLSearchParams();
  if (query) params.set("query", query);
  if (category) params.set("category", category);
  if (sort) params.set("sort", sort);
  if (page) params.set("page", page);

  return params;
}
