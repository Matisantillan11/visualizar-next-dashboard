import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Author } from "@/lib/react-query/authors/author.types";
import { columns } from "./columns";

export function AuthorsTable({
  className,
  authors,
}: {
  className?: string;
  authors: Author[];
}) {
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Autores
      </h2>

      <Table data={authors} columns={columns} />
    </div>
  );
}
