"use client";
import { TrashIcon } from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Author } from "@/lib/react-query/authors/author.types";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";

const EMPTY_PLACEHOLDER = "-";

export const columns = (onDelete: (id: string) => void): Array<ColumnDef<Author>> => [
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
    accessorKey: "biography",
    id: "biography",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Biografía",
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
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <button
          className="absolute right-2 z-50"
          onClick={() => onDelete(row.original.id)}
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      );
    },
    header: "",
  },
];

export const skeletonColumns: Array<ColumnDef<Author>> = [
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
    accessorKey: "biography",
    id: "biography",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Biografía",
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
