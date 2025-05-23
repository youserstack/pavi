"use client";

import { MyAccordion } from "@/components/my-accordion";
import { Button } from "@/components/ui/button";
import MyAvatar from "@/components/my-avatar";
import { useSession } from "next-auth/react";
import MySignOut from "@/components/my-sign-out";
import { Menu } from "lucide-react";
import Link from "next/link";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";
import MySignIn from "@/components/my-sign-in";

export function MyNavDrawer() {
  const { data: session } = useSession();
  const image = session?.user?.image as string;
  const name = session?.user?.name as string;

  return (
    <Drawer direction="left">
      <DrawerTrigger asChild className="md:hidden">
        <Button variant="ghost">
          <Menu />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <div className="flex items-center">
            <Link href="/" className="uppercase mr-auto">
              <DrawerTitle>home</DrawerTitle>
            </Link>
            {session ? <MyAvatar image={image} username={name} /> : <MySignIn />}
          </div>
          <Separator className="my-4" />
          <MyAccordion />
        </DrawerHeader>

        <DrawerFooter>
          <MySignOut />
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
