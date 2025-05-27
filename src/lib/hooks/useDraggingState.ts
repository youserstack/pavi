import { useEffect, useState } from "react";

export default function useDraggingState() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handlePointerUp = () => setIsDragging(false);
    window.addEventListener("pointerup", handlePointerUp);
    return () => window.removeEventListener("pointerup", handlePointerUp);
  }, []);

  return { isDragging, setIsDragging };
}
