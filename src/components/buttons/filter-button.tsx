"use client";

import { Context } from "@/components/providers/providers";
import { Button } from "@/components/ui/button";
import { VscSettings } from "react-icons/vsc";
import { useContext } from "react";
import {
  Drawer,
  DrawerClose,
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
import FiltersCarousel from "@/components/carousels/filters-carousel";

export default function FilterButton() {
  const { isMobile, isDesktop } = useContext(Context);

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
            <VscSettings className="rotate-90" />
            필터
          </Button>
        </DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>필터</DrawerTitle>
          </DrawerHeader>

          <DrawerFooter>
            <DrawerClose>
              <Button className="w-full">확인</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
            <VscSettings className="rotate-90" />
            필터
          </Button>
        </DialogTrigger>

        <DialogContent className="h-[50vh] sm:max-w-xl flex flex-col">
          <DialogHeader>
            <DialogTitle>필터</DialogTitle>
          </DialogHeader>

          <FiltersCarousel />

          <DialogFooter>
            <Button asChild>
              <DialogClose className="w-full">확인</DialogClose>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
}
