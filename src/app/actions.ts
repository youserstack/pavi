"use server";

import { signupSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

export async function signup(prevState: any, formData: FormData) {
  console.log("☑️ signup server action : 회원가입 서버액션 호출");

  // ⚪ 회원가입정보 추출
  const singupFormData = {
    email: formData.get("email")?.toString() || "",
    name: formData.get("name")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    confirmPassword: formData.get("confirmPassword")?.toString() || "",
  };
  console.log("✔️ 회원가입 요청 폼데이터", { singupFormData });

  // ⚪ 유효성 검사
  const result = signupSchema.safeParse(singupFormData);
  if (!result.success) {
    return { validationError: result.error.flatten().fieldErrors };
  }
  console.log("✔️ 유효성 검사된 통과", { result });

  // ⚪ 스프링서버에서 가입처리
  console.log("✔️ 스프링서버에서 회원가입 처리중...");
  const res = await fetch(`${process.env.API_URL}/api/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: result.data.email,
      name: result.data.name,
      password: result.data.password,
    }),
  });
  if (!res.ok) return { signupError: "회원가입 중 오류가 발생했습니다." };
  console.log("✔️ 가입처리 완료");

  // ⚪ 회원가입 성공시 리다이렉트
  console.log("🟡 가입완료후 로그인페이지로 리다이렉트");
  redirect("/signin");
}
