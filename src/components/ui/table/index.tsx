"use client";
import { ZapIcon } from "@/components/layouts/sidebar/icons";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRoot,
  TableRow,
} from "./table-core";

export default function Table<T>({
  data,
  columns,
  onRowClick,
}: {
  data: Array<T>;
  columns: Array<ColumnDef<T>>;
  onRowClick?: (row: T, columnId: string) => void;
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const rows = table.getRowModel().rows;

  return (
    <TableRoot>
      {data.length > 0 ? (
        <>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              const visibleCells = row.getVisibleCells();
              return (
                <TableRow
                  className={
                    onRowClick
                      ? "cursor-pointer text-left text-base font-medium text-dark dark:text-white"
                      : "text-left text-base font-medium text-dark dark:text-white"
                  }
                  key={row.id}
                >
                  {visibleCells.map((cell) => (
                    <TableCell
                      key={cell.id}
                      onClick={() => onRowClick?.(row.original, cell.column.id)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </>
      ) : (
        <div className="flex w-full flex-col items-center justify-center py-10">
          <ZapIcon className="h-12 w-12" />
          <p className="mt-4 text-body-2xlg font-bold text-dark dark:text-white">
            No encontramos datos
          </p>
        </div>
      )}
    </TableRoot>
  );
}
