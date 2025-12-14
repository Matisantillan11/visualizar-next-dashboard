import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Student } from "@/lib/react-query/students/students.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function StudentsTable({
  className,
  students,
}: {
  className?: string;
  students: Student[];
}) {
  const router = useRouter();

  const handleOnRowClick = (row: Student) => {
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
        Estudiantes
      </h2>

      <Table data={students} columns={columns} onRowClick={handleOnRowClick} />
    </div>
  );
}
