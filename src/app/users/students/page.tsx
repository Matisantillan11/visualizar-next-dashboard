import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import getStudents from "./action";
import { StudentsTable } from "@/components/Tables/students";
import { StudentsSkeleton } from "@/components/Tables/students/skeleton";

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <>
      <Breadcrumb pageName="Students" />

      <div className="space-y-10">
        <Suspense fallback={<StudentsSkeleton />}>
          <StudentsTable students={students} />
        </Suspense>
      </div>
    </>
  );
}
