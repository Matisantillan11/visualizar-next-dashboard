import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { AuthorsTable } from "@/components/Tables/authors";
import { AuthorsSkeleton } from "@/components/Tables/authors/skeleton";
import { Suspense } from "react";
import getAuthors from "./action";

export default async function Page() {
  const authors = await getAuthors();

  return (
    <>
      <Breadcrumb pageName="Authors" />

      <div className="space-y-10">
        <Suspense fallback={<AuthorsSkeleton />}>
          <AuthorsTable authors={authors} />
        </Suspense>
      </div>
    </>
  );
}
