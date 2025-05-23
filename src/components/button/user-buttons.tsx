import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignOutButton from "@/components/button/sign-out-button";
import SignInButton from "@/components/button/sign-in-button";
import SignUpButton from "@/components/button/sign-up-button";
import UserAvatar from "@/components/user-avatar";
import { getServerSession } from "next-auth";

export default async function UserButtons() {
  const session = await getServerSession(authOptions);
  const image = session?.user?.image as string;
  const name = session?.user?.name as string;
  console.log({ session });

  return (
    <div className="UserButtons hidden md:flex gap-4 items-center">
      {session ? (
        <>
          <UserAvatar image={image} username={name} />
          <SignOutButton />
        </>
      ) : (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      )}
    </div>
  );
}
