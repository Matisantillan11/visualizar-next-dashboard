import { cn } from "@/lib/utils";
import Table from "@/components/ui/table";

import { columns } from "./columns";
import { Course } from "@/types/course";

export async function CoursesTable({
  className,
  courses,
}: {
  className?: string;
  courses: Course[];
}) {
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Courses
      </h2>

      <Table data={courses} columns={columns} />
    </div>
  );
}
