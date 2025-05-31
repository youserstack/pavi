"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signinSchema, SigninSchema } from "@/lib/schemas";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignInForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninSchema>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninSchema) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      // redirect: true,
      // callbackUrl: "/dashboard",
    });

    if (res?.error) {
      setError("이메일 또는 비밀번호가 잘못되었습니다.");
    } else if (res?.ok) {
      router.refresh(); // 세션 상태 강제 갱신
      // router.push("/"); // 로그인 성공 시 메인으로 이동
    }
  };

  return (
    <form className="GeneralAuth grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <Label>이메일</Label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <Input
          {...register("email")}
          aria-invalid={!!errors.email}
          placeholder="example@example.com"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <Label>비밀번호</Label>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <Input {...register("password")} aria-invalid={!!errors.password} placeholder="********" />
      </div>

      <Button type="submit" className="w-full">
        로그인
      </Button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
