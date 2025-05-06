"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <button onClick={() => signOut()} className="cursor-pointer">
      로그아웃
    </button>
  );
}
