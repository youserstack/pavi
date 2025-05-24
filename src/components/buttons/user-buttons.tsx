import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SignInButton from "@/components/buttons/sign-in-button";
import SignUpButton from "@/components/buttons/sign-up-button";
import UserAvatar from "@/components/user-avatar";
import { getServerSession } from "next-auth";

export default async function UserButtons() {
  const session = await getServerSession(authOptions);
  const user = {
    email: session?.user?.email as string,
    username: session?.user?.name as string,
    image: session?.user?.image as string,
  };

  return (
    <div className="UserButtons hidden md:flex gap-4 items-center">
      {session ? (
        <UserAvatar hasDropdownMenu user={user} />
      ) : (
        <>
          <SignInButton />
          <SignUpButton />
        </>
      )}
    </div>
  );
}
