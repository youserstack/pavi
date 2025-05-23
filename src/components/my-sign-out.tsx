"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function MySignOut() {
  return (
    <Button variant={"outline"} onClick={() => signOut()} className="cursor-pointer">
      로그아웃
    </Button>
  );
}
