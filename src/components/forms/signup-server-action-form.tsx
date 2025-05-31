"use client";

import { signup } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

type InitialState = {
  validationError?: {
    email?: string[] | undefined;
    name?: string[] | undefined;
    password?: string[] | undefined;
    confirmPassword?: string[] | undefined;
  };
  signupError?: string;
};

const initialState: InitialState = {};

export default function SignupServerActionForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  return (
    <form className="GeneralAuth grid gap-6" action={formAction}>
      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <Label>이메일</Label>
          {state?.validationError?.email && (
            <small className="text-red-500">{state.validationError.email[0]}</small>
          )}
        </div>
        <Input name="email" type="email" id="email" placeholder="example@example.com" required />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <Label>이름</Label>
          {state?.validationError?.name && (
            <small className="text-red-500">{state.validationError.name[0]}</small>
          )}
        </div>
        <Input name="name" type="text" id="name" placeholder="이름" required />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <Label>비밀번호</Label>
          {state?.validationError?.password && (
            <small className="text-red-500">{state.validationError.password[0]}</small>
          )}
        </div>
        <Input name="password" type="password" id="password" required />
      </div>

      <div className="grid gap-2">
        <div className="flex items-center gap-4">
          <Label>비밀번호 확인</Label>
          {state?.validationError?.confirmPassword && (
            <small className="text-red-500">{state.validationError.confirmPassword[0]}</small>
          )}
        </div>
        <Input name="confirmPassword" type="password" id="confirmPassword" required />
      </div>

      <Button type="submit" className="w-full" disabled={pending}>
        회원가입
      </Button>

      {state?.signupError && <div className="text-red-500">{state.signupError}</div>}
    </form>
  );
}
