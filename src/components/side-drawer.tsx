"use client";

import { AccordionNavMenu } from "@/components/menus/accordion-nav-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "next-auth/react";
import SignoutButton from "@/components/buttons/signout-button";
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
import SigninButton from "@/components/buttons/signin-button";

export function SideDrawer() {
  const { data: session } = useSession();
  const user = {
    username: session?.user?.name as string,
    image: session?.user?.image as string,
  };

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
            <DrawerClose asChild>
              <Link href="/" className="uppercase mr-auto">
                <DrawerTitle>home</DrawerTitle>
              </Link>
            </DrawerClose>

            {session ? (
              <UserAvatar user={user} />
            ) : (
              <DrawerClose asChild>
                <Link href="/signin">
                  <Button variant={"link"}>로그인</Button>
                </Link>
              </DrawerClose>
            )}
          </div>

          <Separator className="my-4" />

          <AccordionNavMenu />
        </DrawerHeader>

        <DrawerFooter>
          {session && <SignoutButton />}
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
