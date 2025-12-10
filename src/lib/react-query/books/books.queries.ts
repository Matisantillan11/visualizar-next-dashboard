import { createParameterizedQuery, createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";
import type { Book } from "./books.types";

/**
 * Hook to fetch all books
 * 
 * @example
 * ```tsx
 * function BooksList() {
 *   const { data: books, isLoading, error } = useBooks();
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   
 *   return <div>{books.map(book => ...)}</div>;
 * }
 * ```
 */
export const useBooks = () =>
  createQuery<Book[]>({
    url: "/books",
    queryKey: queryKeys.books.lists(),
  })();

/**
 * Hook to fetch a single book by ID
 * 
 * @param id - The book ID
 * 
 * @example
 * ```tsx
 * function BookDetail({ id }: { id: string }) {
 *   const { data: book, isLoading, error } = useBook(id);
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   
 *   return <div>{book.name}</div>;
 * }
 * ```
 */
export const useBook = createParameterizedQuery<Book>((id: string) => ({
  url: `/books/${id}`,
  queryKey: queryKeys.books.detail(id),
}));
