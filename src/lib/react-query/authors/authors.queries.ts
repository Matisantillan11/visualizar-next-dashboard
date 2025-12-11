import type { Author } from "@/lib/react-query/authors/author.types";
import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";

/**
 * Hook to fetch all authors
 *
 * @example
 * ```tsx
 * function AuthorSelect() {
 *   const { data: authors, isLoading } = useAuthors();
 *
 *   if (isLoading) return <div>Loading authors...</div>;
 *
 *   return (
 *     <select>
 *       {authors?.map(author => (
 *         <option key={author.id} value={author.id}>
 *           {author.name}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export const useAuthors = () =>
  createQuery<Author[]>({
    url: "/authors",
    queryKey: queryKeys.authors.lists(),
    fetchConfig: {
      cache: "reload",
    },
  })();
