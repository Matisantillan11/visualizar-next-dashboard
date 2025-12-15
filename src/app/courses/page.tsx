"use client";
import Breadcrumb from "@/components/breadcrumb";
import { CoursesTable } from "@/components/tables/courses";
import { CourseSkeleton } from "@/components/tables/courses/skeleton";
import { useCourses } from "@/lib/react-query/courses";
import Link from "next/link";

export default function CoursesPage() {
  const { data: courses, isPending } = useCourses();

  return (
    <>
      <Breadcrumb pageName="Cursos" />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Cursos
          </h2>
          <Link
            href="/courses/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Agregar Nuevo Curso
          </Link>
        </div>

        <div className="space-y-10">
          {isPending ? (
            <CourseSkeleton />
          ) : (
            <CoursesTable courses={courses ?? []} />
          )}
        </div>
      </div>
    </>
  );
}
