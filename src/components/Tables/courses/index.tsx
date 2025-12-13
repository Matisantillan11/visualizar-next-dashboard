import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Course } from "@/lib/react-query/courses/courses.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function CoursesTable({
  className,
  courses,
}: {
  className?: string;
  courses: Course[];
}) {
  const router = useRouter();

  const handleRowClick = (row: Course) => {
    const courseId = row?.id;
    if (!courseId) return;
    router.push(`/courses/${courseId}`);
  };

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Cursos
      </h2>

      <Table
        data={courses}
        columns={columns}
        onRowClick={(row) => handleRowClick(row)}
      />
    </div>
  );
}
