// import { signin } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function GeneralAuthForm() {
  return (
    <form
      className="GeneralAuth grid gap-6"
      //
      // onSubmit={}
    >
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

// import { signIn } from "@/lib/auth";
// import { AuthError } from "next-auth";
// import { revalidatePath } from "next/cache";
// import { redirect } from "next/navigation";

// export default function GeneralAuthForm({
//   searchParams,
// }: {
//   searchParams?: { [key: string]: string | string[] | undefined };
// }) {
//   console.log({ searchParams });

//   const action = async (formData: FormData) => {
//     "use server";

//     console.log("# 로그인 서버액션");
//     const test = await signIn("credentials", formData);
//     console.log({ test });

//     // try {
//     // } catch (error) {
//     //   console.log("로그인 에러발생");
//     //   console.log(error);

//     //   // 인증 실패 시 AuthError가 발생할 수 있음
//     //   if (error instanceof AuthError) {
//     //     console.log("action error", error.cause?.err?.message);
//     //     const params = new URLSearchParams({
//     //       error: error.type,
//     //       message: error.cause?.err?.message ?? "",
//     //     });
//     //     const url = `/signin?${params.toString()}`;

//     //     redirect(url);
//     //   }

//     //   // 예기치 못한 에러 로그 남기기
//     //   console.error("Unhandled error in signIn:", error);

//     //   // 사용자를 에러 페이지로 보내기
//     //   redirect("/error?message=unexpected");
//     // }
//   };

//   return (
//     <form className="GeneralAuth grid gap-6" action={action}>
//       <div className="grid gap-2">
//         <Label htmlFor="email">이메일</Label>
//         <Input name="email" type="email" id="email" placeholder="example@example.com" required />
//       </div>
//       <div className="grid gap-2">
//         <div className="flex items-center">
//           <Label htmlFor="password">비밀번호</Label>
//           <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
//             비밀번호를 잊으셨나요?
//           </a>
//         </div>
//         <Input name="password" type="password" id="password" required />
//       </div>
//       <Button type="submit" className="w-full">
//         로그인
//       </Button>

//       {typeof searchParams?.message === "string" && (
//         <div className="text-red-500">{decodeURIComponent(searchParams.message)}</div>
//       )}
//     </form>
//   );
// }
