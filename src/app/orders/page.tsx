import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  return (
    <main>
      <section className="min-h-[calc(100vh-40px)] flex flex-col justify-center items-center">
        주문내역
      </section>
    </main>
  );
}
