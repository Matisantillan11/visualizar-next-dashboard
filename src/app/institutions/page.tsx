import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { InstitutionsTable } from "@/components/Tables/institutions";
import { Suspense } from "react";
import getInstitutions from "./action";
import { InstitutionsSkeleton } from "@/components/Tables/institutions/skeleton";

export default async function InstitutionsPage() {
  const institutions = await getInstitutions();

  return (
    <>
      <Breadcrumb pageName="Institutions" />

      <div className="space-y-10">
        <Suspense fallback={<InstitutionsSkeleton />}>
          <InstitutionsTable institutions={institutions} />
        </Suspense>
      </div>
    </>
  );
}
