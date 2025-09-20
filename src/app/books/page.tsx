import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { BooksSkeleton } from "@/components/Tables/books/skeleton";
import { BooksTable } from "@/components/Tables/books";
import getBooks from "./action";

export default async function CategoriesPage() {
  const books = await getBooks();

  return (
    <>
      <Breadcrumb pageName="Books" />

      <div className="space-y-10">
        <Suspense fallback={<BooksSkeleton />}>
          <BooksTable books={books} />
        </Suspense>
      </div>
    </>
  );
}
