import SigninButton from "@/components/buttons/signin-button";
import SignupButton from "@/components/buttons/signup-button";
import UserAvatar from "@/components/user-avatar";
import { getServerSession } from "next-auth";

export default async function UserButtons() {
  const session = await getServerSession();
  // console.log({ session });

  return (
    <div className="UserButtons hidden md:flex gap-4 items-center">
      {session ? (
        <UserAvatar hasDropdownMenu session={session} />
      ) : (
        <>
          <SigninButton />
          <SignupButton />
        </>
      )}
    </div>
  );
}
