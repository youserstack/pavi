"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const brandOptions = [
  { value: "nike", label: "나이키" },
  { value: "adidas", label: "아디다스" },
  { value: "newbalance", label: "뉴발란스" },
  { value: "puma", label: "퓨마" },
  { value: "reebok", label: "리복" },
] as const;

type Brand = (typeof brandOptions)[number]["value"];

export function BrandFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValues = useMemo(() => {
    const brandFilterValues = searchParams.get("brand")?.split(",") ?? [];
    return {
      brands: brandFilterValues.filter((v) => brandOptions.some((o) => o.value === v)) as Brand[],
    };
  }, [searchParams]);
  const form = useForm<{ brands: Brand[] }>({ defaultValues });

  // 체크/해제 시 쿼리 파라미터 업데이트 함수
  const updateQueryParam = (checked: boolean, brandFilterValue: string) => {
    // 쿼리파라미터 배열로 추출
    const params = new URLSearchParams(searchParams);
    const brandFilterValues = params.get("brand")?.split(",") ?? [];
    // console.log({ brands });

    // 토글된 배열로 생성
    const newBrandFilterValues = brandFilterValues.includes(brandFilterValue)
      ? brandFilterValues.filter((v) => v !== brandFilterValue) // 체크해제
      : [...brandFilterValues, brandFilterValue]; // 체크

    // const newBrandFilterValues = checked
    //   ? [...new Set([...brands, brandFilterValue])] // 체크
    //   : brands.filter((b) => b !== brandFilterValue); // 체크해제
    // console.log({ newBrandFilterValues });

    // 쿼리파라미터 추가 및 삭제
    if (newBrandFilterValues.length > 0) {
      params.set("brand", newBrandFilterValues.join(","));
    } else {
      params.delete("brand");
    }

    // 설정된 쿼리파라미터로 라우팅
    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  items-center gap-2">
          {brandOptions.map((option) => (
            <FormField
              key={option.value}
              control={form.control}
              name="brands"
              render={({ field }) => {
                return (
                  <FormItem key={option.value} className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...field.value, option.value] // 체크
                            : field.value?.filter((v) => v !== option.value); // 체크해제
                          field.onChange(updated);

                          updateQueryParam(!!checked, option.value);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </ul>
      </form>
    </Form>
  );
}
