import { number, object, string } from "zod";

export const signinSchema = object({
  email: string({ required_error: "이메일은 필수 항목입니다." })
    .min(1, "이메일은 필수 항목입니다.")
    .email("유효한 이메일 형식이 아닙니다."),

  password: string({ required_error: "비밀번호는 필수 항목입니다." })
    .min(1, "비밀번호는 필수 항목입니다.")
    // .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(32, "비밀번호는 32자 이하이어야 합니다."),
});

export const signupSchema = object({
  email: string({ required_error: "이메일은 필수 항목입니다." })
    .min(1, "이메일은 필수 항목입니다.")
    .email("유효한 이메일 형식이 아닙니다."),

  name: string({ required_error: "이름은 필수 항목입니다." }).min(1, "이름은 필수 항목입니다."),

  password: string({ required_error: "비밀번호는 필수 항목입니다." })
    .min(1, "비밀번호는 필수 항목입니다.")
    // .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .max(32, "비밀번호는 32자 이하이어야 합니다."),

  confirmPassword: string({ required_error: "비밀번호 확인은 필수 항목입니다." }).min(
    1,
    "비밀번호 확인은 필수 항목입니다."
  ),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "비밀번호가 일치하지 않습니다.",
});

export const tableRowSchema = object({
  id: number(),
  header: string(),
  type: string(),
  status: string(),
  target: string(),
  limit: string(),
  reviewer: string(),
});
