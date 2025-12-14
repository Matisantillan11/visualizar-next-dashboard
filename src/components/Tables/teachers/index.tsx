import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Teacher } from "@/lib/react-query/teachers/teachers.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function TeachersTable({
  className,
  teachers,
}: {
  className?: string;
  teachers: Teacher[];
}) {
  const router = useRouter();

  const handleOnRowClick = (row: Teacher) => {
    const id = row?.userId;
    if (id) {
      router.push(`/users/${id}`);
    }
  };

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Profesores
      </h2>

      <Table data={teachers} columns={columns} onRowClick={handleOnRowClick} />
    </div>
  );
}
