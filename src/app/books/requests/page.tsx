import Breadcrumb from "@/components/breadcrumb";
import { BooksRequestsTable } from "@/components/tables/books/requests";
import { BooksSkeleton } from "@/components/tables/books/skeleton";
import { Suspense } from "react";
import { getBooksRequests } from "./action";

export const dynamic = "force-dynamic";

export default async function BooksPage() {
  const booksRequests = await getBooksRequests();

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
          <Suspense fallback={<BooksSkeleton />}>
            <BooksRequestsTable booksRequest={booksRequests} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
