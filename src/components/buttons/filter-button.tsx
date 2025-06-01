"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Context } from "@/components/providers/providers";
import { Button } from "@/components/ui/button";
import { VscSettings } from "react-icons/vsc";
import { useContext } from "react";
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
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TabButtonCarousel3 from "@/components/carousels/tab-button-carousel-3";
import TabButtonCarousel2 from "@/components/carousels/tab-button-carousel-2";

export default function FilterButton() {
  const { isMobile, isDesktop } = useContext(Context);
  const searchParams = useSearchParams();
  const router = useRouter();

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

  if (isDesktop) {
    return (
      <Dialog open>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
            <VscSettings className="rotate-90" />
            필터
          </Button>
        </DialogTrigger>

        <DialogContent className="h-[50vh] sm:max-w-xl flex flex-col">
          <DialogTitle className="hidden">필터</DialogTitle>
          {/* <TabButtonCarousel2 /> */}
          <TabButtonCarousel3 />

          <DialogClose className="mt-auto">확인</DialogClose>
        </DialogContent>
      </Dialog>
    );
  }
}
