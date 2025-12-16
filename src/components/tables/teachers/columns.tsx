import { Skeleton } from "@/components/ui/skeleton";
import { Teacher } from "@/lib/react-query/teachers/teachers.types";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<Teacher>> = [
  {
    enableSorting: true,
    accessorKey: "user.name",
    id: "user.name",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Nombre",
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
    header: "Fecha de Creación",
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
    header: "Nombre",
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
    header: "Fecha de Creación",
  },
];
