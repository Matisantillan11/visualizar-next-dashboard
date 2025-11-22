"use client";

import { updateBookRequestStatus } from "@/app/books/requests/action";
import { StatusDropdown } from "@/components/ui/status-dropdown";
import { BookRequestStatus } from "@/types/book";
import { useRouter } from "next/navigation";

interface StatusCellProps {
  requestId: string;
  currentStatus: BookRequestStatus;
}

export function StatusCell({ requestId, currentStatus }: StatusCellProps) {
  const router = useRouter();

  const handleStatusChange = async (newStatus: BookRequestStatus) => {
    console.log({ newStatus });
    await updateBookRequestStatus(requestId, newStatus);
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <StatusDropdown
      currentStatus={currentStatus}
      onStatusChange={handleStatusChange}
    />
  );
}
