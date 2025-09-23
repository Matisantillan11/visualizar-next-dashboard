import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AuthorsTable } from "@/components/Tables/authors";
import { AuthorsSkeleton } from "@/components/Tables/authors/skeleton";
import { Suspense } from "react";
import Link from "next/link";
import getAuthors from "./action";

export default async function AuthorsPage() {
  const authors = await getAuthors();

  return (
    <>
      <Breadcrumb pageName="Authors" />

      <div className="space-y-6">
        {/* Header with Add New Author button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Author Management
          </h2>
          <Link
            href="/authors/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add New Author
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<AuthorsSkeleton />}>
            <AuthorsTable authors={authors} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
