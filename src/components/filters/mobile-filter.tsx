"use client";

import CategoryFilter from "@/components/filters/category-filter";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { filterItems } from "@/data/filterItems";

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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="rounded-full text-xs" size={"sm"}>
            <VscSettings className="rotate-90" />
            필터
          </Button>
        </DialogTrigger>

        <DialogContent className="h-[50vh] sm:max-w-xl flex flex-col">
          <Tabs defaultValue={filterItems[0].value} className="h-full">
            <DialogHeader>
              <TabsList>
                {filterItems.map((item) => (
                  <TabsTrigger value={item.value}>
                    <DialogTitle>{item.label}</DialogTitle>
                  </TabsTrigger>
                ))}
              </TabsList>
            </DialogHeader>

            <ScrollArea className="overflow-auto rounded-md p-4">
              {filterItems.map((item) => (
                <TabsContent value={item.value} className="">
                  {item.label} ...
                  {/* <CategoryFilter />
                <CategoryFilter />
                <CategoryFilter /> */}
                </TabsContent>
              ))}
            </ScrollArea>

            <DialogFooter className="min-h-fit mt-auto">
              <DialogClose>확인</DialogClose>
            </DialogFooter>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }
}
