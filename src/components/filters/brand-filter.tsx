"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const brandOptions = [
  { id: "nike", label: "나이키" },
  { id: "adidas", label: "아디다스" },
  { id: "newbalance", label: "뉴발란스" },
  { id: "puma", label: "퓨마" },
  { id: "reebok", label: "리복" },
] as const;

type Brand = (typeof brandOptions)[number]["id"];

export function BrandFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultValues = useMemo(() => {
    const brandParams = searchParams.get("brand")?.split(",") ?? [];
    return {
      brands: brandParams.filter((param) =>
        brandOptions.some((option) => option.id === param)
      ) as Brand[],
    };
  }, [searchParams]);

  const form = useForm<{ brands: Brand[] }>({ defaultValues });

  // 체크/해제 시 쿼리 파라미터 업데이트 함수
  const updateQueryParam = (checked: boolean, brandId: string) => {
    // 쿼리파라미터 배열로 추출
    const params = new URLSearchParams(searchParams);
    const brandParams = params.get("brand")?.split(",") ?? [];
    // console.log({ brands });

    // 토글된 배열로 생성
    const newBrandParams = brandParams.includes(brandId)
      ? brandParams.filter((param) => param !== brandId) // 체크해제
      : [...brandParams, brandId]; // 체크

    // const newBrandParams = checked
    //   ? [...new Set([...brands, brandId])] // 체크
    //   : brands.filter((b) => b !== brandId); // 체크해제
    // console.log({ newBrandParams });

    // 쿼리파라미터 추가 및 삭제
    newBrandParams.length > 0
      ? params.set("brand", newBrandParams.join(","))
      : params.delete("brand");

    // 설정된 쿼리파라미터로 라우팅
    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  items-center gap-2">
          {brandOptions.map((option) => (
            <FormField
              key={option.id}
              control={form.control}
              name="brands"
              render={({ field }) => {
                return (
                  <FormItem key={option.id} className="flex flex-row items-center gap-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const updated = checked
                            ? [...field.value, option.id] // 체크
                            : field.value?.filter((v) => v !== option.id); // 체크해제
                          field.onChange(updated);

                          updateQueryParam(!!checked, option.id);
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
