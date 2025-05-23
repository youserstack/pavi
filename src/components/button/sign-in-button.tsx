import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInButton() {
  return (
    <Button asChild variant={"outline"} size={"sm"} className="rounded-full">
      <Link href={"/signin"}>로그인</Link>
    </Button>
  );
}
