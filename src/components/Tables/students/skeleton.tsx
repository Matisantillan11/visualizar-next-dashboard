import Table from "@/components/ui/table";
import { skeletonColumns } from "./columns";
import { Student } from "@/types/student";

export function StudentsSkeleton() {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Students
      </h2>

      <Table
        columns={skeletonColumns}
        data={Array.from({ length: 10 }) as Student[]}
      />
    </div>
  );
}
