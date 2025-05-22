import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignUpForm from "@/app/signup/sign-up-form";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default async function SignUpPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <div className="Box flex w-full max-w-sm flex-col gap-6">
          <Link href="#" className="flex items-center gap-1 self-center font-medium">
            <ShipWheel />
            Pavi Inc.
          </Link>

          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">회원가입</CardTitle>
              </CardHeader>

              <CardContent className="grid gap-6">
                <SignUpForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}
