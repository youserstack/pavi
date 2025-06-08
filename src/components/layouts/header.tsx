import { NavMenu } from "@/components/menus/nav-menu";
import Logo from "@/components/logo";
import UserButtons from "@/components/buttons/user-buttons";
import { SideDrawer } from "@/components/layouts/side-drawer";

export default function Header() {
  return (
    <header className="fixed w-full h-[40px] z-[50]">
      <section className="w-full h-full flex justify-between items-center">
        <Logo />
        <NavMenu />
        <UserButtons />
        <SideDrawer />
      </section>
    </header>
  );
}
