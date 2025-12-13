import { fetcher } from "@/lib/fetcher";
import { Category } from "@/lib/react-query/categories/categories.types";

export async function getCategoryById(id: string): Promise<Category> {
  return await fetcher({ url: `/categories/${id}` });
}
