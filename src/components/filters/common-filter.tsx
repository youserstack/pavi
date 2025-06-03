import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

type FilterOption = {
  value: string; // 필터옵션의 값
  label: string;
};

type Props = {
  name: "brand" | "size"; // 필터옵션의 키, 이름 + 쿼리파라미터 이름 (예: "brand", "size") // 필터옵션의 키
  // name: string; // 필터옵션의 키, 이름 + 쿼리파라미터 이름 (예: "brand", "size") // 필터옵션의 키
  options: FilterOption[];
};

export function CommonFilter({ name, options }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const defaultValues = useMemo(() => {
    const filterValues = searchParams.get(name)?.split(",") ?? [];
    return { [name]: filterValues.filter((v) => options.some((o) => o.value === v)) };
  }, [searchParams, name, options]);
  const form = useForm<{ [key: string]: string[] }>({ defaultValues });

  const updateQueryParam = (checked: boolean, filterValue: string) => {
    // 쿼리파라미터 배열로 추출
    const params = new URLSearchParams(searchParams);
    const filterValues = params.get(name)?.split(",") ?? [];

    // 토글된 배열로 생성
    const newFilterValues = checked
      ? [...new Set([...filterValues, filterValue])]
      : filterValues.filter((v) => v !== filterValue);

    // 쿼리파라미터 추가 및 삭제
    newFilterValues.length > 0 ? params.set(name, newFilterValues.join(",")) : params.delete(name);

    // 설정된 쿼리파라미터로 라우팅
    router.push(`?${params.toString()}`);
  };

  return (
    <Form {...form}>
      <form className="space-y-8">
        <ul className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 items-center gap-2">
          {options.map((option) => (
            <FormField
              key={option.value}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(option.value)}
                      onCheckedChange={(checked) => {
                        const updated = checked
                          ? [...field.value, option.value]
                          : field.value?.filter((v) => v !== option.value);
                        field.onChange(updated);
                        updateQueryParam(!!checked, option.value);
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                </FormItem>
              )}
            />
          ))}
        </ul>
      </form>
    </Form>
  );
}
