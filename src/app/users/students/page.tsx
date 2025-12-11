"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { StudentsTable } from "@/components/Tables/students";
import { StudentsSkeleton } from "@/components/Tables/students/skeleton";
import { useStudents } from "@/lib/react-query/students";
import Link from "next/link";

export default function StudentsPage() {
  const { data: students, isPending } = useStudents();

  return (
    <>
      <Breadcrumb pageName="Estudiantes" />

      <div className="space-y-6">
        {/* Header with Add New Student button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Estudiantes
          </h2>
          <Link
            href="/users/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Agregar Nuevo Estudiante
          </Link>
        </div>

        <div className="space-y-10">
          {isPending ? (
            <StudentsSkeleton />
          ) : (
            <StudentsTable students={students ?? []} />
          )}
        </div>
      </div>
    </>
  );
}
