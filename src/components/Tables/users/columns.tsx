"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Role, User } from "@/lib/react-query/users/users.types";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";
import getRoleBadge from "./utils";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<User>> = [
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
      return getValue() ? getRoleBadge(getValue() as Role) : EMPTY_PLACEHOLDER;
    },
    header: "Rol",
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

export const skeletonColumns: Array<ColumnDef<User>> = [
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
    header: "Rol",
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
