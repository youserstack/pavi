"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupUser } from "@/lib/api/fetchers";
import { signupSchema, SignupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function SignupForm() {
  const router = useRouter();
  const [signupError, setSignupError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      await signupUser(data);
      router.push("/signin");
    } catch (error) {
      setSignupError("서버와의 통신 중 문제가 발생했습니다.");
    }
  };

  return (
    <form className="GeneralAuth grid gap-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <div className="flex items-center gap-4 text-sm">
          <Label>이메일</Label>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </div>
        <Input
          {...register("email")}
          aria-invalid={!!errors.email}
          placeholder="example@example.com"
        />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4 text-sm">
          <Label>이름</Label>
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <Input {...register("name")} type="text" aria-invalid={!!errors.email} />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4 text-sm">
          <Label>비밀번호</Label>
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </div>
        <Input {...register("password")} type="password" aria-invalid={!!errors.password} />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4 text-sm">
          <Label>비밀번호 확인</Label>
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <Input
          {...register("confirmPassword")}
          type="password"
          aria-invalid={!!errors.confirmPassword}
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        회원가입
      </Button>

      {signupError && <p className="text-red-500">{signupError}</p>}
    </form>
  );
}
