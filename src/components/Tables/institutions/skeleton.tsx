import Table from "@/components/ui/table";
import { Institution } from "@/lib/react-query/institutions/institutions.types";
import { skeletonColumns } from "./columns";

export function InstitutionsSkeleton() {
  return (
    <div className="rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card">
      <h2 className="mb-5.5 text-body-2xlg font-bold text-dark dark:text-white">
        Instituciones
      </h2>

      <Table
        columns={skeletonColumns}
        data={Array.from({ length: 10 }) as Institution[]}
      />
    </div>
  );
}
