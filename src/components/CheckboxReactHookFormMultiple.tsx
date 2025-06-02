"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { getContrastTextColor } from "@/lib/colors";
import { Checkbox } from "@/components/ui/checkbox-custom";

const items = [
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

const colorClassMap: Record<string, string> = {
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

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export function CheckboxReactHookFormMultiple() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { items: [] }, // 초기값 설정
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log({ data });
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* items 필드를 폼으로 감싸기 */}
        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem className="border border-red-500">
              {/* 제목 및 설명 */}
              <div className="mb-4">
                <FormLabel className="text-base">Sidebar</FormLabel>
                <FormDescription>
                  Select the items you want to display in the sidebar.
                </FormDescription>
              </div>

              <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4  items-center gap-2">
                {/* 각 항목에 대한 체크박스 렌더링 */}
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex flex-row items-center gap-2 ">
                          <FormControl>
                            <Checkbox
                              className={cn(
                                "rounded-full size-5",
                                // 밝은계열색상은 체크시 체크표시가 보이지 않기때문에 대비색상으로 변경
                                "data-[state=checked]:" +
                                  getContrastTextColor(colorClassMap[item.id]),
                                colorClassMap[item.id],
                                "dark:" + colorClassMap[item.id]
                              )}
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id]) // 추가
                                  : field.onChange(
                                      field.value?.filter((value) => value !== item.id)
                                    ); // 제거
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">{item.label}</FormLabel>
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
