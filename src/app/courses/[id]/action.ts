import { fetcher } from "@/lib/fetcher";
import { Course } from "@/lib/react-query/courses/courses.types";

export async function getCourseById(id: string) {
  return await fetcher<Course>({
    url: `/courses/${id}`,
  });
}
