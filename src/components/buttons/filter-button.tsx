"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
import TabButtonCarousel3 from "@/components/carousels/tab-button-carousel-3";

export default function FilterButton() {
  const { isMobile, isDesktop } = useContext(Context);
  const searchParams = useSearchParams();
  const router = useRouter();

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

          <TabButtonCarousel3 />

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
