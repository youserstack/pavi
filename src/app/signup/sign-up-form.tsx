"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpSchema, SignupSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
  const router = useRouter();
  const [signupError, setSignupError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignupSchema) => {
    try {
      const res = await fetch(`${process.env.API_URL}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // console.log(res);

      if (!res.ok) {
        setSignupError("회원가입 중 오류가 발생했습니다.");
        return;
      }

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

// 서버액션을 사용한 회원가입

// "use client";

// import { signup } from "@/app/actions";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useActionState } from "react";

// const initialState: InitialState = {};

// export default function SignUpForm() {
//   const [state, formAction, pending] = useActionState(signup, initialState);

//   return (
//     <form className="GeneralAuth grid gap-6" action={formAction}>
//       <div className="grid gap-2">
//         <div className="flex items-center gap-4">
//           <Label>이메일</Label>
//           {state?.validationError?.email && (
//             <small className="text-red-500">{state.validationError.email[0]}</small>
//           )}
//         </div>
//         <Input name="email" type="email" id="email" placeholder="example@example.com" required />
//       </div>

//       <div className="grid gap-2">
//         <div className="flex items-center gap-4">
//           <Label>이름</Label>
//           {state?.validationError?.name && (
//             <small className="text-red-500">{state.validationError.name[0]}</small>
//           )}
//         </div>
//         <Input name="name" type="text" id="name" placeholder="이름" required />
//       </div>

//       <div className="grid gap-2">
//         <div className="flex items-center gap-4">
//           <Label>비밀번호</Label>
//           {state?.validationError?.password && (
//             <small className="text-red-500">{state.validationError.password[0]}</small>
//           )}
//         </div>
//         <Input name="password" type="password" id="password" required />
//       </div>

//       <div className="grid gap-2">
//         <div className="flex items-center gap-4">
//           <Label>비밀번호 확인</Label>
//           {state?.validationError?.confirmPassword && (
//             <small className="text-red-500">{state.validationError.confirmPassword[0]}</small>
//           )}
//         </div>
//         <Input name="confirmPassword" type="password" id="confirmPassword" required />
//       </div>

//       <Button type="submit" className="w-full" disabled={pending}>
//         회원가입
//       </Button>

//       {state?.signupError && <div className="text-red-500">{state.signupError}</div>}
//     </form>
//   );
// }
