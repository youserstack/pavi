"use client";

import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox-custom";
import { bgLightColors } from "@/lib/colors";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

const colorOptions = [
  // 화이트 / 아이보리 / 베이지 계열
  { value: "white", label: "화이트" },
  { value: "ivory", label: "아이보리" },
  { value: "beige", label: "베이지" },
  { value: "oatmeal", label: "오트밀" },
  { value: "camel", label: "카멜" },
  { value: "sand", label: "샌드" },

  // 블랙 / 그레이 계열
  { value: "black", label: "블랙" },
  { value: "gray", label: "그레이" },
  { value: "darkgray", label: "다크그레이" },

  // 핑크 / 퍼플 계열
  { value: "pink", label: "핑크" },
  { value: "lightpink", label: "라이트핑크" },
  { value: "darkpink", label: "다크핑크" },
  { value: "rosegold", label: "로즈골드" },
  { value: "lavender", label: "라벤더" },

  // 레드 계열
  { value: "red", label: "레드" },
  { value: "burgundy", label: "버건디" },

  // 오렌지 / 옐로우 계열
  { value: "lightyellow", label: "라이트옐로우" },
  { value: "orange", label: "오렌지" },
  { value: "peach", label: "피치" },
  { value: "darkorange", label: "다크오렌지" },

  // 그린 계열
  { value: "lime", label: "라임" },
  { value: "lightgreen", label: "라이트그린" },
  { value: "green", label: "그린" },
  { value: "darkgreen", label: "다크그린" },
  { value: "mint", label: "민트" },
  { value: "olivegreen", label: "올리브그린" },
  { value: "khaki", label: "카키" },

  // 블루 계열
  { value: "skyblue", label: "스카이블루" },
  { value: "blue", label: "블루" },
  { value: "navy", label: "네이비" },
  { value: "darknavy", label: "다크네이비" },

  // 브라운 계열
  { value: "lightbrown", label: "라이트브라운" },
  { value: "brown", label: "브라운" },
  { value: "darkbrown", label: "다크브라운" },
] as const;

const bgColorMap: Record<string, string> = {
  // 화이트/아이보리/베이지 계열
  white: "bg-white",
  ivory: "bg-neutral-100",
  beige: "bg-neutral-200",
  oatmeal: "bg-stone-200",
  camel: "bg-amber-500",
  sand: "bg-yellow-100",

  // 블랙/그레이 계열
  black: "bg-black",
  gray: "bg-gray-400",
  darkgray: "bg-gray-700",

  // 핑크/보라 계열
  pink: "bg-pink-500",
  lightpink: "bg-pink-200",
  darkpink: "bg-pink-700",
  rosegold: "bg-rose-400",
  lavender: "bg-purple-200",

  // 레드 계열
  red: "bg-red-500",
  burgundy: "bg-red-900",

  // 오렌지/노랑 계열
  lightyellow: "bg-yellow-200",
  orange: "bg-orange-500",
  peach: "bg-orange-200",
  darkorange: "bg-orange-700",

  // 그린 계열
  lime: "bg-lime-400",
  lightgreen: "bg-green-300",
  green: "bg-green-500",
  darkgreen: "bg-green-900",
  mint: "bg-teal-200",
  olivegreen: "bg-lime-800",
  khaki: "bg-amber-800",

  // 블루 계열
  skyblue: "bg-sky-300",
  blue: "bg-blue-500",
  navy: "bg-blue-900",
  darknavy: "bg-blue-950",

  // 브라운 계열
  lightbrown: "bg-amber-300",
  brown: "bg-stone-700",
  darkbrown: "bg-stone-900",
};

type Color = (typeof colorOptions)[number]["value"];

export function ColorFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValues = useMemo(() => {
    const colorFilterValues = searchParams.get("color")?.split(",") ?? [];
    return {
      colors: colorFilterValues.filter((v) => colorOptions.some((o) => o.value === v)) as Color[],
    };
  }, [searchParams]);
  const form = useForm<{ colors: Color[] }>({ defaultValues });

  // 체크/해제 시 쿼리 파라미터 업데이트 함수
  const updateQueryParam = (checked: boolean, colorFilterValue: string) => {
    // 쿼리파라미터 배열로 추출
    const params = new URLSearchParams(searchParams);
    const colorFilterValues = params.get("color")?.split(",") ?? [];
    // console.log({ colors });

    // 토글된 배열로 생성
    const newColorFilterValues = colorFilterValues.includes(colorFilterValue)
      ? colorFilterValues.filter((v) => v !== colorFilterValue) // 체크해제
      : [...colorFilterValues, colorFilterValue]; // 체크
    // const newColorFilterValues = checked
    //   ? [...new Set([...colorFilterValues, colorFilterValue])] // 체크
    //   : colorFilterValues.filter((v) => v !== colorFilterValue); // 체크해제
    // console.log({ newColorFilterValues });

    // 쿼리파라미터 추가 및 삭제
    newColorFilterValues.length > 0
      ? params.set("color", newColorFilterValues.join(","))
      : params.delete("color");

    // 설정된 쿼리파라미터로 라우팅
    router.push(`?${params.toString()}`);
  };

  function onSubmit(data: any) {
    // console.log({ data });
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  items-center gap-2">
          {colorOptions.map((option) => (
            <FormField
              key={option.value}
              control={form.control}
              name="colors"
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
                        className={cn(
                          "rounded-full size-5",
                          bgColorMap[option.value], // 맵객체로 해당칼라 설정
                          bgLightColors.includes(option.value) ? "text-black" : "text-white"
                        )}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
        </ul>
        <button type="submit">Submit</button>
      </form>
    </Form>
  );
}
