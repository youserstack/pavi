"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox-custom";
import { useRouter, useSearchParams } from "next/navigation";

const colors = [
  // 화이트 / 아이보리 / 베이지 계열
  { id: "white", label: "화이트" },
  { id: "ivory", label: "아이보리" },
  { id: "beige", label: "베이지" },
  { id: "oatmeal", label: "오트밀" },
  { id: "camel", label: "카멜" },
  { id: "sand", label: "샌드" },

  // 블랙 / 그레이 계열
  { id: "black", label: "블랙" },
  { id: "gray", label: "그레이" },
  { id: "darkgray", label: "다크그레이" },

  // 핑크 / 퍼플 계열
  { id: "pink", label: "핑크" },
  { id: "lightpink", label: "라이트핑크" },
  { id: "darkpink", label: "다크핑크" },
  { id: "rosegold", label: "로즈골드" },
  { id: "lavender", label: "라벤더" },

  // 레드 계열
  { id: "red", label: "레드" },
  { id: "burgundy", label: "버건디" },

  // 오렌지 / 옐로우 계열
  { id: "lightyellow", label: "라이트옐로우" },
  { id: "orange", label: "오렌지" },
  { id: "peach", label: "피치" },
  { id: "darkorange", label: "다크오렌지" },

  // 그린 계열
  { id: "lime", label: "라임" },
  { id: "lightgreen", label: "라이트그린" },
  { id: "green", label: "그린" },
  { id: "darkgreen", label: "다크그린" },
  { id: "mint", label: "민트" },
  { id: "olivegreen", label: "올리브그린" },
  { id: "khaki", label: "카키" },

  // 블루 계열
  { id: "skyblue", label: "스카이블루" },
  { id: "blue", label: "블루" },
  { id: "navy", label: "네이비" },
  { id: "darknavy", label: "다크네이비" },

  // 브라운 계열
  { id: "lightbrown", label: "라이트브라운" },
  { id: "brown", label: "브라운" },
  { id: "darkbrown", label: "다크브라운" },
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

export function ColorFilter2() {
  const form = useForm<{ colors: ColorId[] }>({ defaultValues: { colors: [] } });
  const router = useRouter();
  const searchParams = useSearchParams();

  function onSubmit(data: any) {
    console.log({ data });
    // toast("You submitted the following values", {
    //   description: (
    //     <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
  }

  // 체크/해제 시 쿼리 파라미터 업데이트 함수
  const updateQueryParam = (checked: boolean, colorId: string) => {
    // 쿼리파라미터 배열로 추출
    const params = new URLSearchParams(searchParams);
    const colors = params.get("color")?.split(",") ?? [];
    console.log({ colors });

    // 토글된 배열로 생성
    const newColors = colors.includes(colorId)
      ? colors.filter((id) => id !== colorId) // 체크해제
      : [...colors, colorId]; // 체크
    // const newColors = checked
    //   ? [...new Set([...colors, colorId])] // 체크
    //   : colors.filter((id) => id !== colorId); // 체크해제
    console.log({ newColors });

    // 쿼리파라미터 추가 및 삭제
    if (newColors.length > 0) {
      params.set("color", newColors.join(","));
    } else {
      params.delete("color");
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* colors 필드를 폼으로 감싸기 */}
        <FormField
          control={form.control}
          name="colors"
          render={() => (
            <FormItem className="border border-red-500">
              <FormLabel className="text-base">Sidebar</FormLabel>
              <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  items-center gap-2">
                {colors.map((color) => (
                  <FormField
                    key={color.id}
                    control={form.control}
                    name="colors"
                    render={({ field }) => {
                      return (
                        <FormItem key={color.id} className="flex flex-row items-center gap-2 ">
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(color.id)}
                              className={cn(
                                "rounded-full size-5",
                                bgColorMap[color.id], // 맵객체로 해당칼라 설정
                                [
                                  "white",
                                  "ivory",
                                  "beige",
                                  "oatmeal",
                                  "camel",
                                  "sand",
                                  "lightyellow",
                                ].includes(color.id)
                                  ? "text-black"
                                  : "text-white"
                                // 밝은계열색상은 체크시 텍스트칼라가 보이지 않기때문에 백그라운드칼라의 대비색상으로 변경
                                // getContrastTextColor(bgColorMap[color.id])
                              )}
                              onCheckedChange={(checked) => {
                                const updated = checked
                                  ? [...field.value, color.id] // 체크
                                  : field.value?.filter((v) => v !== color.id); // 체크해제
                                field.onChange(updated);

                                updateQueryParam(!!checked, color.id);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{color.label}</FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                {/* <FormMessage /> */}
              </ul>
            </FormItem>
          )}
        />

        {/* <Button type="submit">Submit</Button> */}
      </form>
    </Form>
  );
}
