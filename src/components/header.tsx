import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { MyNavDrawer } from "@/components/my-nav-drawer";
import { NavMenubar } from "@/components/nav-menubar";
import MySignOut from "@/components/my-sign-out";
import MySignIn from "@/components/my-sign-in";
import MySignUp from "@/components/my-sign-up";
import MyAvatar from "@/components/my-avatar";
import { getServerSession } from "next-auth";
import { navItems } from "@/data/items";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="Header fixed w-full h-[40px] z-[50]">
      <section className="w-full h-full flex justify-between items-center">
        <Link className="flex items-center gap-2" href={"/"}>
          <Image src="/favicon.png" alt="logo" width={200} height={200} className="size-4" />
          <p className="font-semibold uppercase">Pavi</p>
        </Link>
        <NavMenubar navItems={navItems} />
        <UserMenu />
        <MyNavDrawer />
      </section>
    </header>
  );
}

async function UserMenu() {
  const session = await getServerSession(authOptions);
  const image = session?.user?.image as string;
  const name = session?.user?.name as string;
  console.log({ session });

  return (
    <div className={"UserMenu hidden md:flex gap-4 items-center"}>
      {session ? (
        <>
          {/* <ul>
            <li>
              <Link href={"/dashboard"}>대시보드</Link>
            </li>
          </ul> */}
          <MyAvatar image={image} username={name} />
          <MySignOut />
        </>
      ) : (
        <>
          <MySignIn />
          <MySignUp />
        </>
      )}
    </div>
  );
}
