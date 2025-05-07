import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Dashboard from "@/app/dashboard/dashboard";
import DashboardSkeleton from "@/components/dashboard-skeleton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function getUser(user: any) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/users?email=${user.email}`);
    if (!res.ok) throw new Error("not ok");
    return res.json();
  } catch (error) {
    const msg = "❌ 에러발생";
    console.error(msg, error);
    return null;
  }
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  // // 세션이 있으면 사용자 데이터 요청
  //   console.log(session.user);
  //   const protectedData = await getUser(session.user);
  //   console.log("🟢 인증된 사용자 데이터", { protectedData });

  return (
    <main>
      <section>
        <Suspense fallback={<DashboardSkeleton />}>
          <Dashboard />
        </Suspense>
      </section>
    </main>
  );
}
