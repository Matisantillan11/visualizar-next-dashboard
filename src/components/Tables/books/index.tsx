import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { Book } from "@/lib/react-query/books/books.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function BooksTable({
  className,
  books,
}: {
  className?: string;
  books: Book[];
}) {
  const router = useRouter();

  const handleRowClick = (book: Book) => {
    const id = book?.id;
    if (!id) return;
    router.push(`/books/${id}`);
  };

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Libros
      </h2>

      <Table data={books} columns={columns} onRowClick={handleRowClick} />
    </div>
  );
}
