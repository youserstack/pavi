"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";

export default function OauthSignInButton({ provider }: { provider: "google" | "naver" }) {
  return (
    <Button
      variant="outline"
      className="w-full cursor-pointer"
      onClick={() => signIn(provider, { redirect: true, callbackUrl: "/dashboard" })}
    >
      {provider === "google" && <FcGoogle className="size-4" />}
      {provider === "naver" && <SiNaver className="size-3 text-[#03C75A]" />}
      <span>
        {provider === "google" && "구글로 로그인"}
        {provider === "naver" && "네이버로 로그인"}
      </span>
    </Button>
  );
}
