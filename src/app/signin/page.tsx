import { ShipWheel } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import OauthButtons from "@/app/signin/oauth-buttons";
import GeneralAuthForm from "@/app/signin/general-auth-form";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function SigninPage(props: { searchParams: SearchParams }) {
  // const searchParams = await props.searchParams;
  const session = await getServerSession(authOptions);

  if (session) {
    // 이미 로그인된 경우 /dashboard로 서버 리다이렉트
    redirect("/dashboard");
  }

  return (
    <main className="SigninPage">
      <section className="flex flex-col items-center justify-center">
        <div className="Box flex w-full max-w-sm flex-col gap-6">
          <Link href="#" className="flex items-center gap-1 self-center font-medium">
            <ShipWheel />
            Logo Inc.
          </Link>

          <div className="flex flex-col gap-6">
            <Card className="border-border">
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Welcome back</CardTitle>
                <CardDescription>사용할 계정을 선택하세요</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-6">
                <OauthButtons />
                <Divider />
                {/* <GeneralAuthForm searchParams={searchParams} /> */}
                <GeneralAuthForm />
                <SignupNotice />
              </CardContent>
            </Card>

            <AgreementNotice />
          </div>
        </div>
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

function SignupNotice() {
  return (
    <div className="text-center text-sm space-x-4">
      <span>계정이 없으신가요?</span>
      <a href="#" className="underline underline-offset-4">
        회원가입
      </a>
    </div>
  );
}

function AgreementNotice() {
  return (
    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-primary">
      <span>계속 진행하면 </span>
      <a href="#">이용 약관</a>
      <span> 및 </span>
      <a href="#">개인정보 처리방침</a>
      <span> 에 동의하는 것으로 간주됩니다.</span>
    </div>
  );
}
