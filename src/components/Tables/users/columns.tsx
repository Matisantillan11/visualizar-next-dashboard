"use client";
import { User } from "@/types/user";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/date-utils";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<User>> = [
  {
    enableSorting: true,
    accessorKey: "name",
    id: "name",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Name",
  },
  {
    enableSorting: true,
    accessorKey: "email",
    id: "email",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Email",
  },
  {
    enableSorting: true,
    accessorKey: "dni",
    id: "dni",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "DNI",
  },
  {
    enableSorting: true,
    accessorKey: "role",
    id: "role",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Role",
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

export const skeletonColumns: Array<ColumnDef<User>> = [
  {
    enableSorting: true,
    accessorKey: "name",
    id: "name",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Name",
  },
  {
    enableSorting: true,
    accessorKey: "email",
    id: "email",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Email",
  },
  {
    enableSorting: true,
    accessorKey: "dni",
    id: "dni",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "DNI",
  },
  {
    enableSorting: true,
    accessorKey: "role",
    id: "role",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Role",
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
