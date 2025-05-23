import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function MyAvatar({ image, username }: { image: string; username: string }) {
  return (
    <Avatar>
      <AvatarImage src={image || "https://github.com/shadcn.png"} alt={"avatar"} />
      <AvatarFallback>{username.slice(0, 1).toUpperCase() || "CN"}</AvatarFallback>
    </Avatar>
  );
}
