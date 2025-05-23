"use client";

import { AccordionNavMenu } from "@/components/menu/accordion-nav-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import { useSession } from "next-auth/react";
import SignOutButton from "@/components/button/sign-out-button";
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
import SignInButton from "@/components/button/sign-in-button";

export function SideDrawer() {
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
            {session ? <UserAvatar image={image} username={name} /> : <SignInButton />}
          </div>
          <Separator className="my-4" />
          <AccordionNavMenu />
        </DrawerHeader>

        <DrawerFooter>
          <SignOutButton />
          <DrawerClose asChild>
            <Button variant="outline">닫기</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
