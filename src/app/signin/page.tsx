import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInWithOauth from "@/components/sign-in-with-oauth";
import SignInForm from "@/app/signin/sign-in-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="SigninPage">
      <section className="min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">로그인</CardTitle>
            <CardDescription>사용할 계정을 선택하세요</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-6">
            <ul className="flex flex-col gap-2">
              <SignInWithOauth provider="google" />
              <SignInWithOauth provider="naver" />
            </ul>
            <Divider />

            <SignInForm />
            <Notice />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function Divider() {
  return (
    <div className="Divider relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
      <span className="relative z-10 bg-background px-2 text-muted-foreground">
        또는 이메일로 계속하기
      </span>
    </div>
  );
}

function Notice() {
  return (
    <div className="flex justify-between gap-2 text-sm">
      <Link href="#" className="underline-offset-4 hover:underline">
        비밀번호 찾기
      </Link>

      <Link href={"/signup"} className="underline-offset-4 hover:underline">
        회원가입
      </Link>
    </div>
  );
}
