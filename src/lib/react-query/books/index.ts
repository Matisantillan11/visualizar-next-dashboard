/**
 * Book Module - TanStack Query Hooks
 * 
 * This module provides type-safe hooks for managing books data:
 * - Queries: useBooks, useBook
 * - Mutations: useCreateBook, useUpdateBook, useDeleteBook
 */

export { useCreateBook, useDeleteBook, useUpdateBook } from "./books.mutations";
export { useBook, useBooks } from "./books.queries";
export type { Book, BookCreationOptions, CreateBookInput, UpdateBookInput } from "./books.types";

