import { ReadonlyURLSearchParams } from "next/navigation";

export function useQueryParams(searchParams: ReadonlyURLSearchParams): URLSearchParams {
  const params = new URLSearchParams();
  for (const [key, value] of searchParams.entries()) {
    if (value) params.set(key, value);
  }

  return params;
}
