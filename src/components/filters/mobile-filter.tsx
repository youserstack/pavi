import { ButtonCarouselBar } from "@/components/button-carousel-bar";
import CategoryFilter from "@/components/filters/category-filter";
import MobileFilter from "@/components/filters/mobile-filter";
import { useRouter, useSearchParams } from "next/navigation";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import { VscSettings } from "react-icons/vsc";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Context } from "@/components/providers/providers";
import { useContext } from "react";

export default function FilterButton() {
  const { isMobile, isTablet, isDesktop } = useContext(Context);
  const searchParams = useSearchParams();
  const router = useRouter();

  // const handleClick = (value: string) => {
  //   // 쿼리파라미터에서 해당하는 타입의 쿼리스트링을 추출 (category, brand, color,...)
  //   const queryString = searchParams.get(type) ?? "";

  //   // 배열로 변환
  //   const values = queryString ? queryString.split(",") : [];

  //   // 토클적용한 새로운 배열 생성
  //   const newValues = values.includes(value)
  //     ? values.filter((v) => v !== value)
  //     : [...values, value];

  //   // 다시 요청할 쿼리파라미터로 쿼리스트링을 생성
  //   const params = new URLSearchParams(searchParams.toString());
  //   if (newValues.length > 0) {
  //     params.set(type, newValues.join(","));
  //   } else {
  //     params.delete(type);
  //   }

  //   // 라우팅
  //   router.push(`?${params.toString()}`);
  // };

  if (isMobile) {
    return (
      <Drawer direction="top">
        <DrawerTrigger asChild>
          <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
            <VscSettings className="rotate-90" />
            필터
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>title</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>footer</DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  if (isTablet || isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
            <VscSettings className="rotate-90" />
            필터
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>

          <div>
            <CategoryFilter />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}
