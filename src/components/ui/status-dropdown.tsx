"use client";

import {
  Dropdown,
  DropdownClose,
  DropdownContent,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { StatusBadge } from "@/components/ui/status-badge";
import { cn } from "@/lib/utils";
import { BookRequestStatus } from "@/types/book";
import { useState } from "react";

// Define the status transition rules
const STATUS_TRANSITIONS: Record<BookRequestStatus, BookRequestStatus[]> = {
  [BookRequestStatus.PENDING]: [
    BookRequestStatus.APPROVED,
    BookRequestStatus.DENIED,
  ],
  [BookRequestStatus.APPROVED]: [BookRequestStatus.PUBLISHED],
  [BookRequestStatus.DENIED]: [BookRequestStatus.PUBLISHED],
  [BookRequestStatus.PUBLISHED]: [], // No transitions from PUBLISHED
};

export interface StatusDropdownProps {
  currentStatus: BookRequestStatus;
  onStatusChange: (newStatus: BookRequestStatus) => void | Promise<void>;
  disabled?: boolean;
  align?: "start" | "end" | "center";
}

export function StatusDropdown({
  currentStatus,
  onStatusChange,
  disabled = false,
  align = "end",
}: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const availableStatuses = STATUS_TRANSITIONS[currentStatus] || [];

  const handleStatusChange = async (newStatus: BookRequestStatus) => {
    setIsLoading(true);
    try {
      await onStatusChange(newStatus);
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // If there are no available transitions, just show the badge without dropdown
  if (availableStatuses.length === 0 || disabled) {
    return <StatusBadge status={currentStatus} />;
  }

  return (
    <Dropdown isOpen={isOpen} setIsOpen={setIsOpen}>
      <DropdownTrigger
        className={cn(
          "transition-opacity",
          isLoading && "cursor-not-allowed opacity-50",
        )}
      >
        <StatusBadge
          status={currentStatus}
          className="cursor-pointer transition-opacity hover:opacity-80"
        />
      </DropdownTrigger>

      <DropdownContent
        align={align}
        className="min-w-[150px] rounded-lg border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-800"
      >
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Change Status
          </div>
          {availableStatuses.map((status) => (
            <DropdownClose key={status}>
              <button
                onClick={() => handleStatusChange(status)}
                disabled={isLoading}
                className={cn(
                  "w-full rounded-md px-3 py-2 text-left transition-colors",
                  "hover:bg-gray-100 dark:hover:bg-gray-700",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                )}
              >
                <StatusBadge status={status} className="pointer-events-none" />
              </button>
            </DropdownClose>
          ))}
        </div>
      </DropdownContent>
    </Dropdown>
  );
}
