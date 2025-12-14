import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Institution } from "@/lib/react-query/institutions/institutions.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function InstitutionsTable({
  className,
  institutions,
}: {
  className?: string;
  institutions: Institution[];
}) {
  const router = useRouter();

  const handleRowClick = (institution: Institution) => {
    const id = institution?.id;
    if (!id) return;
    router.push(`/institutions/${id}`);
  };

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Instituciones
      </h2>

      <Table
        data={institutions}
        columns={columns}
        onRowClick={handleRowClick}
      />
    </div>
  );
}
