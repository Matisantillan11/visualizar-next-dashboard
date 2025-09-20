import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import { StudentsSkeleton } from "@/components/Tables/students/skeleton";
import { TeachersTable } from "@/components/Tables/teachers";
import getTeachers from "./action";

export default async function TeachersPage() {
  const teachers = await getTeachers();

  return (
    <>
      <Breadcrumb pageName="Teachers" />

      <div className="space-y-10">
        <Suspense fallback={<StudentsSkeleton />}>
          <TeachersTable teachers={teachers} />
        </Suspense>
      </div>
    </>
  );
}
