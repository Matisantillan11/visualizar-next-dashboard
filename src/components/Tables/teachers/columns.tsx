"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/date-utils";
import { Teacher } from "@/types/teacher";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<Teacher>> = [
  {
    enableSorting: true,
    accessorKey: "user.name",
    id: "user.name",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Name",
  },
  {
    enableSorting: true,
    accessorKey: "user.email",
    id: "user.email",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Email",
  },
  {
    enableSorting: true,
    accessorKey: "user.dni",
    id: "user.dni",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "DNI",
  },
  {
    enableSorting: true,
    accessorKey: "createdAt",
    id: "createdAt",
    cell: ({ getValue }) => {
      return formatDate(getValue() as string) ?? EMPTY_PLACEHOLDER;
    },
    header: "Created At",
  },
];

export const skeletonColumns: Array<ColumnDef<Teacher>> = [
  {
    enableSorting: true,
    accessorKey: "user.name",
    id: "user.name",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Name",
  },
  {
    enableSorting: true,
    accessorKey: "user.email",
    id: "user.email",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Email",
  },
  {
    enableSorting: true,
    accessorKey: "user.dni",
    id: "user.dni",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "DNI",
  },
  {
    enableSorting: true,
    accessorKey: "createdAt",
    id: "createdAt",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Created At",
  },
];
