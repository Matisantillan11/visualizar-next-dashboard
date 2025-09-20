import { fetcher } from "@/lib/fetcher";
import { Category } from "@/types/category";

export default async function getCategories() {
  return await fetcher<Category[]>({ url: "/categories" });
}
