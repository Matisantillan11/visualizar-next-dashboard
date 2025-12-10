import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { BooksRequestsTable } from "@/components/Tables/books/requests";
import { BooksSkeleton } from "@/components/Tables/books/skeleton";
import { Suspense } from "react";
import getBooksRequests from "./action";

export default async function BooksPage() {
  const booksRequests = await getBooksRequests();

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
          <Suspense fallback={<BooksSkeleton />}>
            <BooksRequestsTable booksRequest={booksRequests} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
