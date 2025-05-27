import { ButtonCarouselBar } from "@/components/button-carousel-bar";
import { Button } from "@/components/ui/button";
import { categoryFilterItems } from "@/data/filterItems";
import React from "react";
import { VscSettings } from "react-icons/vsc";

export default function FilterBar() {
  return (
    <div className="flex items-center gap-3">
      <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
        <VscSettings className="rotate-90" />
        필터
      </Button>

      <ButtonCarouselBar items={categoryFilterItems} />
    </div>
  );
}
