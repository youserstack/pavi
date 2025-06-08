"use client";

import { Context } from "@/components/providers/providers";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { IoIosStar } from "react-icons/io";

export default function ReviewTabLinkButton() {
  const { setCurrentTab } = useContext(Context);

  return (
    <Button
      variant={"link"}
      className="text-xs inline-flex gap-2"
      onClick={() => setCurrentTab("review")}
    >
      <span className="inline-flex gap-1">
        <IoIosStar className="text-amber-500 text-sm" />
        <span className="font-semibold ">4.3</span>
      </span>

      <span className="underline">리뷰 300개</span>
    </Button>
  );
}
