import { Checkbox } from "@/components/ui/checkbox";
import { Checkbox as CustomCheckbox } from "@/components/ui/checkbox-custom";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

type FilterOption = {
  value: string; // 필터옵션의 값
  label: string;
};

type Props = {
  name: "color" | "size" | "brand" | "price" | "productType"; // 필터옵션의 키, 이름 + 쿼리파라미터 이름 (예: "brand", "size") // 필터옵션의 키
  // name: string; // 필터옵션의 키, 이름 + 쿼리파라미터 이름 (예: "brand", "size") // 필터옵션의 키
  options: FilterOption[];
  checkboxClassName?: (option: FilterOption, checked: boolean) => string;
};

export function CommonCheckboxFilter({ name, options, checkboxClassName }: Props) {
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
              render={({ field }) => {
                const isChecked = field.value?.includes(option.value);
                return (
                  <FormItem className="flex flex-row items-center gap-2">
                    <FormControl>
                      {name === "color" ? (
                        // Checkbox 를 그대로 사용하기에는 변경할 스타일이 너무 많아서
                        // Checkbox 를 복사하고 기본 몇가지 스타일을 제거후 사용
                        <CustomCheckbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...field.value, option.value]
                              : field.value?.filter((v) => v !== option.value);
                            field.onChange(updated);
                            updateQueryParam(!!checked, option.value);
                          }}
                          className={checkboxClassName?.(option, isChecked)}
                        />
                      ) : (
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={(checked) => {
                            const updated = checked
                              ? [...field.value, option.value]
                              : field.value?.filter((v) => v !== option.value);
                            field.onChange(updated);
                            updateQueryParam(!!checked, option.value);
                          }}
                          className={checkboxClassName?.(option, isChecked)}
                        />
                      )}
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
