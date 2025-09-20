import { fetcher } from "@/lib/fetcher";
import { Student } from "@/types/student";

export default async function getStudents() {
  return await fetcher<Student[]>({ url: "/students" });
}
