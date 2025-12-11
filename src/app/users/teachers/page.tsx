import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TeachersTable } from "@/components/Tables/teachers";
import { TeachersSkeleton } from "@/components/Tables/teachers/skeleton";
import Link from "next/link";
import { Suspense } from "react";
import getTeachers from "./action";

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <>
      <Breadcrumb pageName="Profesores" />

      <div className="space-y-6">
        {/* Header with Add New Teacher button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Profesores
          </h2>
          <Link
            href="/users/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Agregar Nuevo Profesor
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<TeachersSkeleton />}>
            <TeachersTable teachers={teachers} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
