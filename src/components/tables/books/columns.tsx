import { TrashIcon } from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { Book } from "@/lib/react-query/books/books.types";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const EMPTY_PLACEHOLDER = "-";

export const columns = (
  onDelete: (id: string) => void,
): Array<ColumnDef<Book>> => [
  {
    enableSorting: true,
    accessorKey: "imageUrl",
    id: "imageUrl",
    cell: ({ getValue, row }) => {
      return (
        <Image
          src={getValue() as string}
          alt={row?.original?.name?.toLowerCase()?.replace(/ /g, "-")}
          width={32}
          height={32}
          className="rounded-lg"
        />
      );
    },
    header: "Imagen",
  },
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
    accessorKey: "description",
    id: "description",
    cell: ({ getValue }) => {
      return getValue()
        ? `${(getValue() as string)?.slice(0, 150)}...`
        : EMPTY_PLACEHOLDER;
    },
    header: "Descripción",
  },
  {
    enableSorting: true,
    accessorKey: "releaseDate",
    id: "releaseDate",
    cell: ({ getValue, row }) => {
      return getValue()
        ? formatDate(getValue() as string)
        : formatDate(row.original.createdAt);
    },
    header: "Fecha de Lanzamiento",
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

export const skeletonColumns: Array<ColumnDef<Book>> = [
  {
    enableSorting: true,
    accessorKey: "imageUrl",
    id: "imageUrl",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Imagen",
  },
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
    accessorKey: "description",
    id: "description",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Descripción",
  },
  {
    enableSorting: true,
    accessorKey: "releaseDate",
    id: "releaseDate",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Fecha de Lanzamiento",
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
