"use client";

import {
  ArrowUpCircleIcon,
  BarChartIcon,
  FolderIcon,
  HelpCircleIcon,
  LayoutDashboardIcon,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NavSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  console.log({ session });

  return (
    <Sidebar
      variant="sidebar"
      collapsible="offcanvas"
      {...props}
      className="fixed top-[40px] h-[calc(100vh-40px)]"
    >
      <SidebarHeader className="/bg-amber-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Pavi Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="/bg-lime-200">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="/bg-cyan-200">
        {session ? (
          <NavUser
            user={{
              name: session?.user?.name ?? data.user.name,
              email: session?.user?.email ?? data.user.email,
              avatar: session?.user?.image ?? data.user.avatar,
            }}
          />
        ) : (
          <>
            <Button size={"sm"} asChild>
              <Link href={"/signin"}>로그인</Link>
            </Button>

            <Button size={"sm"} asChild>
              <Link href={"/signup"}>회원가입</Link>
            </Button>
          </>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}

const data = {
  user: { name: "shadcn", email: "m@example.com", avatar: "/avatars/shadcn.jpg" },
  navMain: [
    { title: "대시보드", url: "#", icon: LayoutDashboardIcon },
    { title: "프로젝트", url: "#", icon: FolderIcon },
    { title: "사용자", url: "#", icon: UsersIcon },
    { title: "차트분석", url: "#", icon: BarChartIcon },
  ],
  navSecondary: [
    { title: "설정", url: "#", icon: SettingsIcon },
    { title: "도움말", url: "#", icon: HelpCircleIcon },
    { title: "검색", url: "#", icon: SearchIcon },
  ],
};
