import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Category } from "@/lib/react-query/categories/categories.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function CategoriesTable({
  className,
  categories,
}: {
  className?: string;
  categories: Category[];
}) {
  const router = useRouter();

  const handleRowClick = (row: Category) => {
    const id = row?.id;

    if (!id) return;
    router.push(`/categories/${id}`);
  };

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Categorias de libros
      </h2>

      <Table data={categories} columns={columns} onRowClick={handleRowClick} />
    </div>
  );
}
