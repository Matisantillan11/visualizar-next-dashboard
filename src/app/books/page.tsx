"use client";

import Breadcrumb from "@/components/breadcrumb";
import { BooksTable } from "@/components/tables/books";
import { BooksSkeleton } from "@/components/tables/books/skeleton";
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
