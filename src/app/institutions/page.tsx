import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InstitutionsTable } from "@/components/Tables/institutions";
import { Suspense } from "react";
import Link from "next/link";
import getInstitutions from "./action";
import { InstitutionsSkeleton } from "@/components/Tables/institutions/skeleton";

export default async function InstitutionsPage() {
  const institutions = await getInstitutions();

  return (
    <>
      <Breadcrumb pageName="Institutions" />

      <div className="space-y-6">
        {/* Header with Add New Institution button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Institution Management
          </h2>
          <Link
            href="/institutions/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add New Institution
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<InstitutionsSkeleton />}>
            <InstitutionsTable institutions={institutions} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
