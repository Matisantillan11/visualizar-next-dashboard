/**
 * Centralized query key management
 * 
 * This file exports query key factories for all resources in the application.
 * Using a hierarchical structure allows for efficient cache invalidation.
 * 
 * @example
 * // Invalidate all books queries
 * queryClient.invalidateQueries({ queryKey: queryKeys.books.all });
 * 
 * // Invalidate only book lists
 * queryClient.invalidateQueries({ queryKey: queryKeys.books.lists() });
 * 
 * // Invalidate a specific book
 * queryClient.invalidateQueries({ queryKey: queryKeys.books.detail(id) });
 */

import { createQueryKeyFactory } from "./types";

export const queryKeys = {
  books: createQueryKeyFactory("books"),
  authors: createQueryKeyFactory("authors"),
  courses: createQueryKeyFactory("courses"),
  categories: createQueryKeyFactory("categories"),
  institutions: createQueryKeyFactory("institutions"),
  users: createQueryKeyFactory("users"),
  bookRequests: createQueryKeyFactory("bookRequests"),
} as const;
