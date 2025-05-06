"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GeneralAuthForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      email,
      password,
      // redirect: true,
      // callbackUrl: "/dashboard",
      redirect: false,
    });

    if (res?.error) {
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    } else if (res?.ok) {
      router.refresh(); // 세션 상태 강제 갱신
      // router.push("/"); // 로그인 성공 시 메인으로 이동
    }
  };

  return (
    <form className="GeneralAuth grid gap-6" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="email">이메일</Label>
        <Input name="email" type="email" id="email" placeholder="example@example.com" required />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center">
          <Label htmlFor="password">비밀번호</Label>
          <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>
        <Input name="password" type="password" id="password" required />
      </div>
      <Button type="submit" className="w-full">
        로그인
      </Button>
    </form>
  );
}
