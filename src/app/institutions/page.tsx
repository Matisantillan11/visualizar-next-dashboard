"use client";
import Breadcrumb from "@/components/breadcrumb";
import { InstitutionsTable } from "@/components/tables/institutions";
import { InstitutionsSkeleton } from "@/components/tables/institutions/skeleton";
import { useInstitutions } from "@/lib/react-query/institutions";
import Link from "next/link";

export default function InstitutionsPage() {
  const { data: institutions, isPending } = useInstitutions();

  return (
    <>
      <Breadcrumb pageName="Instituciones" />

      <div className="space-y-6">
        {/* Header with Add New Institution button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Instituciones
          </h2>
          <Link
            href="/institutions/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Agregar Nueva Institución
          </Link>
        </div>

        <div className="space-y-10">
          {isPending ? (
            <InstitutionsSkeleton />
          ) : (
            <InstitutionsTable institutions={institutions ?? []} />
          )}
        </div>
      </div>
    </>
  );
}
