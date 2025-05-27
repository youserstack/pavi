import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function usePointerUpEffect(setIsDragging: Dispatch<SetStateAction<boolean>>) {
  // 드레그시 커서스타일변경을위한 이벤트 등록 및 삭제
  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);
}
