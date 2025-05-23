import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";

type MenuItem = {
  id: string;
  name: string;
  children?: MenuItem[];
};

export function NavMenubar({ items }: { items: MenuItem[] }) {
  return (
    <Menubar className="border-none">
      {items.map((item) => (
        <MenubarMenu key={item.name}>
          <MenubarTrigger>{item.name} </MenubarTrigger>
          <MenubarContent>
            {item.children?.map((child) => {
              // 카테고리메뉴의 하위메뉴가 존재시
              if (child.children && child.children.length > 0) {
                return (
                  <MenubarSub key={child.id}>
                    <MenubarSubTrigger>{child.name}</MenubarSubTrigger>
                    <MenubarSubContent>
                      {child.children.map((sub) => (
                        <MenubarItem key={sub.id}>{sub.name}</MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                );
              }
              // 카테고리메뉴의 하위메뉴가 부재시
              else {
                return <MenubarItem key={child.id}>{child.name}</MenubarItem>;
              }
            })}
          </MenubarContent>
        </MenubarMenu>
      ))}
    </Menubar>
  );
}
