import { Button } from "@/components/ui/button";
import React from "react";
import { VscSettings } from "react-icons/vsc";

export default function FilterBar() {
  return (
    <div className="flex justify-end items-center gap-2">
      <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
        <VscSettings className="rotate-90" />
        필터
      </Button>

      {filterItems.map((item) => (
        <Button key={item.value} variant={"outline"} className="rounded-full text-xs" size={"sm"}>
          {item.label}
        </Button>
      ))}
    </div>
  );
}

const filterItems = [
  { value: "category", label: "카테고리" },
  { value: "brand", label: "브랜드" },
  { value: "size", label: "사이즈" },
  { value: "color", label: "색상" },
  { value: "price", label: "가격" },
  { value: "type", label: "상품유형" },
];
