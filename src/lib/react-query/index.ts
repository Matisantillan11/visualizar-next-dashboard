/**
 * TanStack Query Library
 * 
 * A generic, type-safe abstraction layer for data fetching and mutations.
 * Integrates with the existing fetcher utility and provides:
 * - Automatic caching and cache invalidation
 * - Loading and error states
 * - Retry logic with exponential backoff
 * - Optimistic updates support
 * - DevTools for debugging
 */

export { createQueryClient, queryClientConfig } from "./config";
export { createDeleteMutation, createMutation } from "./mutation-factory";
export { ReactQueryProvider } from "./provider";
export { createParameterizedQuery, createQuery } from "./query-factory";
export { queryKeys } from "./query-keys";
export type {
    ApiError, ApiResponse, MutationOptions,
    QueryKeyFactory, QueryOptions
} from "./types";

