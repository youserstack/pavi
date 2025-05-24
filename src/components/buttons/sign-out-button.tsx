"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignOutButton({
  plain,
  variant,
}: {
  plain?: boolean;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | null
    | undefined;
}) {
  if (plain) return <button onClick={() => signOut()}>로그아웃</button>;

  return (
    <Button variant={variant} onClick={() => signOut()}>
      로그아웃
    </Button>
  );
}
