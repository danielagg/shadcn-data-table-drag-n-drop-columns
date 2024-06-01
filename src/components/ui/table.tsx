import * as React from "react";
import { Column, ColumnDef, Header, flexRender } from "@tanstack/react-table";
import { useDrag, useDrop } from "react-dnd";

import { cn } from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b border-slate-700 transition-colors hover:bg-muted/10 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

interface DraggableColProps<T> {
  col: Column<T>;
  header: Header<T, unknown>;
  columnOrder: {
    id: string;
    index: number;
  }[];
  columns: ColumnDef<T>[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnDef<T>[]>>;
}

const DraggableCol = <T,>({
  col,
  header,
  columnOrder,
  columns: mutableColumns,
  setColumns: setMutableColumns,
}: DraggableColProps<T>) => {
  const reorderCol = (draggedColIndex: number, targetColIndex: number) => {
    let newColumns = [...mutableColumns];

    let draggedCol = newColumns.splice(draggedColIndex, 1)[0];
    newColumns.splice(targetColIndex, 0, draggedCol);

    setMutableColumns(newColumns);
  };

  const [, dropRef] = useDrop({
    accept: "column",
    drop: (draggedCol: Column<any>) => {
      console.log({ columnOrder, draggedCol });
      const draggedColIndex = columnOrder.filter(
        (x) => x.id === draggedCol.id
      )[0].index;

      const colIndex = columnOrder.filter((x) => x.id === col.id)[0].index;
      reorderCol(draggedColIndex, colIndex);
    },
  });

  const [{ isDragging }, dragRef, previewRef] = useDrag({
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: () => col,
    type: "column",
  });

  return (
    <TableHead
      ref={previewRef}
      className={`relative overflow-auto break-words ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
      style={{
        width: header.getSize(),
      }}
    >
      <TableCell ref={dropRef} className="pl-0">
        <div ref={dragRef} className="cursor-move">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      </TableCell>
    </TableHead>
  );
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  DraggableCol,
};
