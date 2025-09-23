import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import Link from "next/link";
import { BooksSkeleton } from "@/components/Tables/books/skeleton";
import { BooksTable } from "@/components/Tables/books";
import getBooks from "./action";

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <>
      <Breadcrumb pageName="Books" />

      <div className="space-y-6">
        {/* Header with Add New Book button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Book Management
          </h2>
          <Link
            href="/books/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add New Book
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<BooksSkeleton />}>
            <BooksTable books={books} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
