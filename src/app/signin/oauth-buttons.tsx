"use client";

import SignInWithOauth from "@/components/sign-in-with-oauth";
import { FcGoogle } from "react-icons/fc";

export default function OauthButtons() {
  return (
    <div className="Oauth flex flex-col gap-4">
      <SignInWithOauth provider="google" label="구글로 로그인" Icon={FcGoogle} />
    </div>
  );
}
