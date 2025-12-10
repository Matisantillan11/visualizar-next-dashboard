import type { Category } from "@/types/category";
import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";

/**
 * Hook to fetch all categories
 * 
 * @example
 * ```tsx
 * function CategorySelect() {
 *   const { data: categories, isLoading } = useCategories();
 *   
 *   if (isLoading) return <div>Loading categories...</div>;
 *   
 *   return (
 *     <select>
 *       {categories?.map(category => (
 *         <option key={category.id} value={category.id}>
 *           {category.name}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export const useCategories = () =>
  createQuery<Category[]>({
    url: "/categories",
    queryKey: queryKeys.categories.lists(),
  })();
