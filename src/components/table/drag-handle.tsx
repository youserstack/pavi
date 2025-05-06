import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { GripVerticalIcon } from "lucide-react";

// 드래그 핸들을 위한 별도의 컴포넌트를 생성하세요
export default function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({ id });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="size-7 text-muted-foreground hover:bg-transparent"
    >
      <GripVerticalIcon className="size-3 text-muted-foreground" />
      <span className="sr-only">드래그하여 순서 변경</span>
    </Button>
  );
}
