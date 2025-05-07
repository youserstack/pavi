import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignUpForm from "@/app/signup/sign-up-form";
import { ShipWheel } from "lucide-react";
import Link from "next/link";

export default async function SignUpPage() {
  return (
    <main>
      <section>
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
