import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link className="flex items-center gap-2" href={"/"}>
      <Image src="/favicon.png" alt="logo" width={200} height={200} className="size-4" />
      <p className="font-semibold uppercase">Pavi</p>
    </Link>
  );
}
