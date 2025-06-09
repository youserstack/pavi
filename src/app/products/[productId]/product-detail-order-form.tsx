"use client";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreditCard, Minus, Plus } from "lucide-react";

export function ProductDetailOrderForm() {
  const form = useForm<{ color: string; size: string; count: number }>({
    defaultValues: { color: "", size: "", count: 1 },
  });

  function onSubmit(data: unknown) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="옵션 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="red">레드</SelectItem>
                  <SelectItem value="green">그린</SelectItem>
                  <SelectItem value="blue">블루</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="size"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="옵션 선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                  <SelectItem value="2xl">2XL</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <div className="w-full flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    field.onChange(field.value - 1);
                  }}
                  disabled={field.value <= 1}
                >
                  <Minus />
                  <span className="sr-only">Decrease</span>
                </Button>

                <div className="flex-1 text-center">
                  <div className="text-xl font-bold tracking-tighter">{field.value}</div>
                </div>

                {/* <FormControl>
                  <Input {...field} />
                </FormControl> */}

                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={(e) => {
                    e.preventDefault();
                    field.onChange(field.value + 1);
                  }}
                  disabled={field.value >= 100}
                >
                  <Plus />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <CreditCard />
          구매하기
        </Button>
      </form>
    </Form>
  );
}
