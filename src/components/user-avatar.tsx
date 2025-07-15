import SignoutButton from "@/components/buttons/signout-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Session } from "next-auth";
import Link from "next/link";

export default function UserAvatar({
  hasDropdownMenu,
  session: { user },
}: {
  hasDropdownMenu?: boolean;
  session: Session;
}) {
  if (hasDropdownMenu) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer hover:ring-2 /hover:ring-ring hover:ring-emerald-400 transition duration-300">
            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={"avatar"} />
            <AvatarFallback>{user?.name?.slice(0, 1)?.toUpperCase() || "CN"}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56 [&_*]:cursor-pointer">
          <DropdownMenuLabel className="hover:cursor-default">
            {user?.email || "example@gmail.com"}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <DropdownMenuItem>프로필</DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/orders"}>주문내역</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>설정</DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="size-full cursor-pointer">
            <SignoutButton plain />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Avatar>
      <AvatarImage src={user?.image || "https://github.com/shadcn.png"} alt={"avatar"} />
      <AvatarFallback>{user?.name?.slice(0, 1)?.toUpperCase() || "CN"}</AvatarFallback>
    </Avatar>
  );
}
