import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

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
      <section className="flex flex-col justify-center items-center"></section>
    </main>
  );
}
