import { ReadonlyURLSearchParams } from "next/navigation";

// getExistingSearchParams
export function getExistingSearchParams(searchParams: ReadonlyURLSearchParams): URLSearchParams {
  const params = new URLSearchParams();

  for (const [key, value] of searchParams.entries()) {
    if (value) params.set(key, value);
  }

  return params;
}
