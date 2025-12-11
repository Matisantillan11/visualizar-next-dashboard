"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BooksTable } from "@/components/Tables/books";
import { BooksSkeleton } from "@/components/Tables/books/skeleton";
import { useBooks } from "@/lib/react-query/books";

export default function BooksPage() {
  const { data: books, isPending } = useBooks();

  return (
    <>
      <Breadcrumb pageName="Libros" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Libros
          </h2>
        </div>

        <div className="space-y-10">
          {isPending ? <BooksSkeleton /> : <BooksTable books={books ?? []} />}
        </div>
      </div>
    </>
  );
}
