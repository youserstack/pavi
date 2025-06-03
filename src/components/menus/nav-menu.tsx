import { navItems } from "@/data/items";
import Link from "next/link";
import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function NavMenu() {
  return (
    <Menubar className="hidden md:flex border-none">
      {navItems.map((navItem) => (
        <MenubarMenu key={navItem.name}>
          <MenubarTrigger className="navItem hover:bg-accent hover:text-accent-foreground">
            {navItem.name}
          </MenubarTrigger>
          <MenubarContent
            className="
            [&_a]:w-full 
            [&_a]:space-x-2
            [&_*]:cursor-pointer"
          >
            {navItem.children?.map((v1) => {
              // 레벨1(children)+레벨2(subChildren)
              if (v1.children && v1.children.length > 0) {
                return (
                  <MenubarSub key={v1.id}>
                    <Link
                      href={
                        navItem.id === "category" || navItem.id === "brand"
                          ? `/products?${navItem.id}=${v1.id}`
                          : `/${navItem.id}?type=${v1.id}`
                      }
                    >
                      <MenubarSubTrigger>
                        <MenubarItem>
                          {v1.icon && <span>{v1.icon}</span>}
                          <span>{v1.name}</span>
                          {v1.emoji && <span>{v1.emoji}</span>}
                        </MenubarItem>
                      </MenubarSubTrigger>
                    </Link>
                    <MenubarSubContent>
                      {v1.children?.map((v2) => (
                        <Link
                          key={v2.id}
                          href={
                            navItem.id === "category" || navItem.id === "brand"
                              ? `/products?${navItem.id}=${v2.id}`
                              : `/${navItem.id}?type=${v2.id}`
                          }
                        >
                          <MenubarItem>
                            {v2.icon && <span>{v2.icon}</span>}
                            <MenubarLabel>{v2.name}</MenubarLabel>
                            {v2.emoji && <span>{v2.emoji}</span>}
                          </MenubarItem>
                        </Link>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                );
              }
              // 레벨1(children)
              else {
                return (
                  <Link
                    href={
                      navItem.id === "category" || navItem.id === "brand"
                        ? `/products?${navItem.id}=${v1.id}`
                        : `/${navItem.id}?type=${v1.id}`
                    }
                  >
                    <MenubarItem key={v1.id}>
                      {v1.icon && <span>{v1.icon}</span>}
                      <MenubarLabel>{v1.name}</MenubarLabel>
                      {v1.emoji && <span>{v1.emoji}</span>}
                    </MenubarItem>
                  </Link>
                );
              }
            })}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
