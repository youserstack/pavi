import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import SignupForm from "@/components/forms/signup-form";

export default async function SignupPage() {
  return (
    <main>
      <section className="min-h-screen flex flex-col items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">회원가입</CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6">
            <SignupForm />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
