import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "@/components/sign-out";
import Image from "next/image";
import { categoryItems, navItems } from "@/data/items";
import { NavMenubar } from "@/components/nav-menubar";

export default function Header() {
  return (
    <header className="Header fixed w-full h-[40px] z-[50]">
      <section className="w-full h-full flex justify-between items-center">
        <Link className="flex items-center gap-2" href={"/"}>
          <Image src="/favicon.png" alt="logo" width={200} height={200} className="size-4" />
          <p className="font-semibold uppercase">Pavi</p>
        </Link>
        <Nav />
        <UserMenu />
      </section>
    </header>
  );
}

function Nav() {
  return (
    <nav className="flex items-center gap-3 font-semibold text-sm">
      {/* {navItems.map((item) => (
        <Button variant={"ghost"} asChild key={item.name}>
          <Link href={""}>{item.name}</Link>
        </Button>
      ))} */}

      <NavMenubar navItems={navItems} />
    </nav>
  );
}

async function UserMenu({ className }: { className?: string }) {
  const session = await getServerSession(authOptions);
  console.log({ session });

  return (
    <div className={cn("UserMenu flex gap-4 items-center", className)}>
      {session ? (
        <>
          <ul>
            <li>
              <Link href={"/dashboard"}>대시보드</Link>
            </li>
          </ul>

          <Avatar>
            <AvatarImage
              src={session.user?.image || "https://github.com/shadcn.png"}
              alt={"avatar"}
            />
            <AvatarFallback>
              {session?.user?.name?.slice(0, 1).toUpperCase() || "CN"}
            </AvatarFallback>
          </Avatar>

          <SignOut />
        </>
      ) : (
        <>
          <Button asChild variant={"outline"} size={"sm"} className="rounded-full">
            <Link href={"/signin"}>로그인</Link>
          </Button>

          <Button asChild variant={"outline"} size={"sm"} className="rounded-full">
            <Link href={"/signup"}>회원가입</Link>
          </Button>
        </>
      )}
    </div>
  );
}
