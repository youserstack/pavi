import { menus } from "@/data/nav-items";
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
      {menus.map((menu) => (
        <MenubarMenu key={menu.name}>
          <MenubarTrigger>{menu.name}</MenubarTrigger>
          <MenubarContent className="[&_a]:block [&_a]:w-full [&_*]:cursor-pointer">
            {menu.children?.map((v1) => {
              // 레벨1(children)+레벨2(subChildren)
              if (v1.children && v1.children.length > 0) {
                return (
                  <MenubarSub key={v1.id}>
                    <Link
                      href={
                        menu.id === "category" || menu.id === "brand"
                          ? v1.id === "all"
                            ? "/products"
                            : `/products?${menu.id}=${v1.id}`
                          : `/${menu.id}?type=${v1.id}`
                      }
                    >
                      <MenubarSubTrigger
                      // onClick={() => {
                      //   router.push(
                      //     menu.id === "category" || menu.id === "brand"
                      //       ? v1.id === "all"
                      //         ? "/products"
                      //         : `/products?${menu.id}=${v1.id}`
                      //       : `/${menu.id}?type=${v1.id}`
                      //   );

                      //   // 메뉴리스트를 닫기위해서 리로드
                      //   window.location.reload();
                      // }}
                      >
                        {v1.icon && <span>{v1.icon}</span>}
                        <MenubarLabel>{v1.name}</MenubarLabel>
                        {v1.emoji && <span>{v1.emoji}</span>}
                      </MenubarSubTrigger>
                    </Link>
                    <MenubarSubContent>
                      {v1.children?.map((v2) => (
                        <Link
                          key={v2.id}
                          href={
                            menu.id === "category" || menu.id === "brand"
                              ? `/products?${menu.id}=${v1.id},${v2.id}`
                              : `/${menu.id}?type=${v2.id}`
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
                    key={v1.id}
                    href={
                      menu.id === "category" || menu.id === "brand"
                        ? v1.id === "all"
                          ? "/products"
                          : `/products?${menu.id}=${v1.id}`
                        : `/${menu.id}?type=${v1.id}`
                    }
                  >
                    <MenubarItem>
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
