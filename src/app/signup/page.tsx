import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpForm from "@/app/signup/sign-up-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">회원가입</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6">
            <SignUpForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
