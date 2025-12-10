"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BooksTable } from "@/components/Tables/books";
import { BooksSkeleton } from "@/components/Tables/books/skeleton";
import { useBooks } from "@/lib/react-query/books";

export default function BooksPage() {
  const { data: books, isLoading, error } = useBooks();

  return (
    <>
      <Breadcrumb pageName="Books" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Book Management
          </h2>
        </div>

        <div className="space-y-10">
          {isLoading && <BooksSkeleton />}
          {error && (
            <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
              Error loading books: {error.message}
            </div>
          )}
          {books && <BooksTable books={books ?? []} />}
        </div>
      </div>
    </>
  );
}
