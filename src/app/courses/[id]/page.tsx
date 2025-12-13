import CourseForm from "../create/_components/course-form";
import { getCourseById } from "./action";
import { parseCourse } from "./utils";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const course = await getCourseById(id);

  return <CourseForm courseId={id} course={parseCourse(course)} />;
}
