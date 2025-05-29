import { ButtonCarouselBar2 } from "@/components/button-carousel-bar-2";
import FilterButton from "@/components/filters/mobile-filter";
import { categoryFilterItems } from "@/data/filterItems";

export default function FilterBar() {
  return (
    <div className="flex items-center gap-3">
      <FilterButton />

      {/* <ButtonCarouselBar items={categoryFilterItems} /> */}
      <ButtonCarouselBar2 type="category" items={categoryFilterItems} />
    </div>
  );
}
