"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Category } from "@/lib/react-query/categories/categories.types";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<Category>> = [
  {
    enableSorting: true,
    accessorKey: "name",
    id: "name",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Nombre",
  },
  {
    enableSorting: true,
    accessorKey: "createdAt",
    id: "createdAt",
    cell: ({ getValue }) => {
      return formatDate(getValue() as string) ?? EMPTY_PLACEHOLDER;
    },
    header: "Fecha de Creación",
  },
];

export const skeletonColumns: Array<ColumnDef<Category>> = [
  {
    enableSorting: true,
    accessorKey: "name",
    id: "name",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Nombre",
  },
  {
    enableSorting: true,
    accessorKey: "createdAt",
    id: "createdAt",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Fecha de Creación",
  },
];
