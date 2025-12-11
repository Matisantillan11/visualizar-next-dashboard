"use client";

import { cn } from "@/lib/utils";
import { BookRequestStatus } from "@/types/book";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const statusBadgeVariants = cva(
  "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium transition-colors",
  {
    variants: {
      status: {
        [BookRequestStatus.PENDING]:
          "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        [BookRequestStatus.APPROVED]:
          "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        [BookRequestStatus.DENIED]:
          "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        [BookRequestStatus.PUBLISHED]:
          "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
      },
    },
    defaultVariants: {
      status: BookRequestStatus.PENDING,
    },
  },
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  status: BookRequestStatus;
}

export function StatusBadge({ className, status, ...props }: StatusBadgeProps) {
  const statusLabels = {
    [BookRequestStatus.PENDING]: "Pendiente",
    [BookRequestStatus.APPROVED]: "Aprobado",
    [BookRequestStatus.DENIED]: "Rechazado",
    [BookRequestStatus.PUBLISHED]: "Publicado",
  };

  return (
    <span className={cn(statusBadgeVariants({ status }), className)} {...props}>
      {statusLabels[status]}
    </span>
  );
}
