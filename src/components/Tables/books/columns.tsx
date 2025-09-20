"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils/date-utils";
import { Book } from "@/types/book";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<Book>> = [
  {
    enableSorting: true,
    accessorKey: "imageUrl",
    id: "imageUrl",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Image",
  },
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
    accessorKey: "description",
    id: "description",
    cell: ({ getValue }) => {
      return getValue()
        ? `${(getValue() as string)?.slice(0, 150)}...`
        : EMPTY_PLACEHOLDER;
    },
    header: "description",
  },
  {
    enableSorting: true,
    accessorKey: "releaseDate",
    id: "releaseDate",
    cell: ({ getValue }) => {
      return formatDate(getValue() as string) ?? EMPTY_PLACEHOLDER;
    },
    header: "Released At",
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

export const skeletonColumns: Array<ColumnDef<Book>> = [
  {
    enableSorting: true,
    accessorKey: "imageUrl",
    id: "imageUrl",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Image",
  },
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
    accessorKey: "description",
    id: "description",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "description",
  },
  {
    enableSorting: true,
    accessorKey: "releaseDate",
    id: "releaseDate",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Released At",
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
