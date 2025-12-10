import { createDeleteMutation, createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type { Book, CreateBookInput, UpdateBookInput } from "./books.types";

/**
 * Hook to create a new book
 *
 * Automatically invalidates the books list cache after successful creation.
 *
 * @example
 * ```tsx
 * function CreateBookForm() {
 *   const createBook = useCreateBook();
 *
 *   const handleSubmit = async (data: CreateBookInput) => {
 *     try {
 *       const newBook = await createBook.mutateAsync(data);
 *       router.push('/books');
 *     } catch (error) {
 *       console.error('Failed to create book:', error);
 *     }
 *   };
 *
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       {createBook.isPending && <div>Creating...</div>}
 *       {createBook.error && <div>Error: {createBook.error.message}</div>}
 *       ...
 *     </form>
 *   );
 * }
 * ```
 */
export const useCreateBook = () =>
  createMutation<Book, CreateBookInput>({
    url: "/books",
    method: "POST",
    invalidateKeys: [queryKeys.books.lists()],
  })();

/**
 * Hook to update an existing book
 *
 * Automatically invalidates both the books list and the specific book detail cache.
 *
 * @example
 * ```tsx
 * function EditBookForm({ bookId }: { bookId: string }) {
 *   const updateBook = useUpdateBook();
 *
 *   const handleSubmit = async (data: Partial<CreateBookInput>) => {
 *     try {
 *       await updateBook.mutateAsync({ id: bookId, ...data });
 *     } catch (error) {
 *       console.error('Failed to update book:', error);
 *     }
 *   };
 *
 *   return <form onSubmit={handleSubmit}>...</form>;
 * }
 * ```
 */
export const useUpdateBook = () =>
  createMutation<Book, UpdateBookInput>({
    url: (variables) => `/books/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.books.lists(), queryKeys.books.details()],
  })();

/**
 * Hook to delete a book
 *
 * Automatically invalidates the books list cache after successful deletion.
 *
 * @example
 * ```tsx
 * function DeleteBookButton({ bookId }: { bookId: string }) {
 *   const deleteBook = useDeleteBook();
 *
 *   const handleDelete = async () => {
 *     if (confirm('Are you sure?')) {
 *       try {
 *         await deleteBook.mutateAsync(bookId);
 *       } catch (error) {
 *         console.error('Failed to delete book:', error);
 *       }
 *     }
 *   };
 *
 *   return (
 *     <button onClick={handleDelete} disabled={deleteBook.isPending}>
 *       {deleteBook.isPending ? 'Deleting...' : 'Delete'}
 *     </button>
 *   );
 * }
 * ```
 */
export const useDeleteBook = () =>
  createDeleteMutation<void>({
    url: (id) => `/books/${id}`,
    invalidateKeys: [queryKeys.books.lists()],
  })();
