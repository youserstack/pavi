import { SideDrawer } from "@/components/side-drawer";
import { NavMenu } from "@/components/menu/nav-menu";
import Logo from "@/components/logo";
import UserButtons from "@/components/button/user-buttons";

export default function Header() {
  return (
    <header className="Header fixed w-full h-[40px] z-[50]">
      <section className="w-full h-full flex justify-between items-center">
        <Logo />
        <NavMenu />
        <UserButtons />
        <SideDrawer />
      </section>
    </header>
  );
}
