import { fetcher } from "@/lib/fetcher";
import { Course } from "@/types/course";

export default async function getCourses() {
  return await fetcher<Course[]>({ url: "/courses" });
}
