"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function SignoutButton({
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
  const handleClick = () => {
    console.log("handleclick");
    signOut();
  };

  if (plain) return <button onClick={handleClick}>로그아웃</button>;

  return (
    <Button variant={variant} onClick={handleClick}>
      로그아웃
    </Button>
  );
}
