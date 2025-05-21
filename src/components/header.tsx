import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOut from "@/components/sign-out";

export default function Header() {
  return (
    <header className="Header fixed w-full h-[40px] z-[50]">
      <section className="w-full h-full flex justify-between items-center">
        <Link className="Logo" href={"/"}>
          <p className="font-semibold uppercase flex gap-1 items-center">
            <span className="hidden sm:block">logo</span>
          </p>
        </Link>

        <UserMenu />
      </section>
    </header>
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
          <Button size={"sm"} asChild>
            <Link href={"/signin"}>로그인</Link>
          </Button>

          <Button size={"sm"} asChild>
            <Link href={"/signup"}>회원가입</Link>
          </Button>
        </>
      )}
    </div>
  );
}
