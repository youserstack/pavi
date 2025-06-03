import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

type FilterOption = {
  value: string; // 필터옵션의 값
  label: string;
};

type Props = {
  name: "price"; // 필터옵션의 키, 이름
  options: FilterOption[];
};

export function CommonRadioGroupFilter({ name, options }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const defaultValue = useMemo(() => {
    const selected = searchParams.get(name);
    return selected && options.some((o) => o.value === selected) ? selected : "";
  }, [searchParams, name, options]);

  const form = useForm<{ [key: string]: string }>({ defaultValues: { [name]: defaultValue } });

  const updateQueryParam = (selectedValue: string) => {
    const params = new URLSearchParams(searchParams);
    selectedValue ? params.set(name, selectedValue) : params.delete(name);
    router.push(`?${params.toString()}`);
  };

  const onSubmit = (data: any) => console.log({ data });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name={name}
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(value);
                      updateQueryParam(value);
                    }}
                    className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 items-center gap-2"
                  >
                    {options.map((option) => (
                      <FormItem key={option.value} className="flex flex-row items-center gap-2">
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">{option.label}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
              </FormItem>
            );
          }}
        />
      </form>
    </Form>
  );
}
