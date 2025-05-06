import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Row, flexRender } from "@tanstack/react-table";
import { z } from "zod";
import { TableCell, TableRow } from "@/components/ui/table";
import { tableRowSchema } from "@/lib/schemas";

export default function DraggableRow({ row }: { row: Row<z.infer<typeof tableRowSchema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({ id: row.original.id });

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="☑️DraggableRow relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{ transform: CSS.Transform.toString(transform), transition: transition }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
