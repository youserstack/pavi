"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { IconType } from "react-icons/lib";

interface Props {
  provider: string;
  label: string;
  Icon: IconType;
  iconClassName?: string;
}

export default function SignInWithOauth({ provider, label, Icon, iconClassName }: Props) {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={async () => await signIn(provider, { redirect: true, callbackUrl: "/dashboard" })}
    >
      <Icon className={iconClassName} />
      <span>{label}</span>
    </Button>
  );
}
