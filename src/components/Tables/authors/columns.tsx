"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Author } from "@/types/author";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<Author>> = [
  {
    enableSorting: true,
    accessorKey: "imageUrl",
    id: "imageUrl",
    cell: ({ getValue, row }) => {
      console.log(getValue());
      return (
        <Image
          src={getValue() as string}
          alt={row.original.name.toLowerCase().replace(/ /g, "-")}
          width={32}
          height={32}
          className="rounded-lg"
        />
      );
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
    accessorKey: "biography",
    id: "biography",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Biography",
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

export const skeletonColumns: Array<ColumnDef<Author>> = [
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
    accessorKey: "biography",
    id: "biography",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Biography",
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
