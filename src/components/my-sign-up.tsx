import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MySignUp() {
  return (
    <Button asChild variant={"outline"} size={"sm"} className="rounded-full">
      <Link href={"/signup"}>회원가입</Link>
    </Button>
  );
}
