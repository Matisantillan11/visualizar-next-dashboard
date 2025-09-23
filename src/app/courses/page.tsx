import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import Link from "next/link";
import { CoursesTable } from "@/components/Tables/courses";
import { CourseSkeleton } from "@/components/Tables/courses/skeleton";
import getCourses from "./action";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <Breadcrumb pageName="Courses" />

      <div className="space-y-6">
        {/* Header with Add New Course button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Course Management
          </h2>
          <Link
            href="/courses/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add New Course
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<CourseSkeleton />}>
            <CoursesTable courses={courses} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
