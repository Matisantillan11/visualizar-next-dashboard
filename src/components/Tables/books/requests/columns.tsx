"use client";
import { ArrowLeftIcon } from "@/assets/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { BookRequest, BookRequestStatus } from "@/types/book";
import { formatDate } from "@/utils/date-utils";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { getReverseAnimationsSelected } from "./helper";
import { StatusCell } from "./status-cell";

const EMPTY_PLACEHOLDER = "-";

export const columns: Array<ColumnDef<BookRequest>> = [
  {
    enableSorting: true,
    accessorKey: "title",
    id: "title",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Título",
  },
  {
    enableSorting: true,
    accessorKey: "authorName",
    id: "authorName",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Autor",
  },
  {
    enableSorting: true,
    accessorKey: "comments",
    id: "comments",
    cell: ({ getValue }) => {
      return getValue()
        ? `${(getValue() as string)?.slice(0, 150)}...`
        : EMPTY_PLACEHOLDER;
    },
    header: "Comentarios",
  },
  {
    enableSorting: true,
    accessorKey: "animations",
    id: "animations",
    cell: ({ getValue }) => {
      return (
        getReverseAnimationsSelected(getValue() as string[]) ??
        EMPTY_PLACEHOLDER
      );
    },
    header: "Animaciones",
  },
  {
    enableSorting: true,
    accessorKey: "user.name",
    id: "userName",
    cell: ({ getValue }) => {
      return getValue() ?? EMPTY_PLACEHOLDER;
    },
    header: "Solicitado por",
  },
  {
    enableSorting: true,
    accessorKey: "bookRequestCourse",
    id: "courseName",
    cell: ({ getValue }) => {
      const bookRequestCourse = getValue() as BookRequest["bookRequestCourse"];
      const coursesNames = bookRequestCourse.map(
        (course) => course.course.name,
      );
      return coursesNames.join(", ") ?? EMPTY_PLACEHOLDER;
    },
    header: "Curso",
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
    enableSorting: true,
    accessorKey: "status",
    id: "status",
    cell: ({ row }) => {
      const request = row.original;
      return (
        <StatusCell requestId={request.id} currentStatus={request.status} />
      );
    },
    header: "Estado",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const bookRequestStatus = row.original.status;
      const bookRequestId = row.original.id;
      if (bookRequestStatus === BookRequestStatus.APPROVED) {
        return (
          <Link
            href={`/books/create/${bookRequestId}`}
            className="inline-flex h-10 w-10 rotate-180 items-center justify-center rounded-lg text-center text-white hover:bg-primary/50 hover:bg-opacity-90"
          >
            <ArrowLeftIcon />
          </Link>
        );
      }

      return null;
    },
    header: "",
  },
];

export const skeletonColumns: Array<ColumnDef<BookRequest>> = [
  {
    enableSorting: true,
    accessorKey: "title",
    id: "title",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Título",
  },
  {
    enableSorting: true,
    accessorKey: "authorName",
    id: "authorName",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Autor",
  },
  {
    enableSorting: true,
    accessorKey: "comments",
    id: "comments",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Comentarios",
  },
  {
    enableSorting: true,
    accessorKey: "animations",
    id: "animations",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Animaciones",
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
  {
    enableSorting: true,
    accessorKey: "status",
    id: "status",
    cell: () => {
      return <Skeleton className="h-8" />;
    },
    header: "Estado",
  },
];
