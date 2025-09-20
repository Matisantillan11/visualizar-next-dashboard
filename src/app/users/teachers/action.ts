import { fetcher } from "@/lib/fetcher";
import { Teacher } from "@/types/teacher";

export default async function getTeachers() {
  return await fetcher<Teacher[]>({ url: "/teachers" });
}
