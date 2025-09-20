import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { CoursesTable } from "@/components/Tables/courses";
import { CourseSkeleton } from "@/components/Tables/courses/skeleton";
import getCourses from "./action";

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <>
      <Breadcrumb pageName="Courses" />

      <div className="space-y-10">
        <Suspense fallback={<CourseSkeleton />}>
          <CoursesTable courses={courses} />
        </Suspense>
      </div>
    </>
  );
}
