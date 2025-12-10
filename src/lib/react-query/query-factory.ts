import { fetcher } from "@/lib/fetcher";
import { useQuery, type QueryKey } from "@tanstack/react-query";
import type { ApiError, QueryOptions } from "./types";

/**
 * Configuration for creating a query hook
 */
interface CreateQueryConfig<TData> {
  /**
   * The API endpoint URL
   */
  url: string;
  /**
   * Query key for caching and invalidation
   */
  queryKey: QueryKey;
  /**
   * Optional fetch configuration
   */
  fetchConfig?: RequestInit;
  /**
   * Whether to include authentication headers (default: true)
   */
  withAuthentication?: boolean;
}

/**
 * Generic factory function to create type-safe query hooks
 * Integrates with the existing fetcher utility
 *
 * @example
 * ```ts
 * const useBooks = () =>
 *   createQuery<Book[]>({
 *     url: "/books",
 *     queryKey: ["books", "list"],
 *   });
 * ```
 */
export function createQuery<TData = unknown, TError = ApiError>({
  url,
  queryKey,
  fetchConfig,
  withAuthentication = true,
}: CreateQueryConfig<TData>) {
  return (options?: QueryOptions<TData, TError>) => {
    return useQuery<TData, TError>({
      queryKey,
      queryFn: async () => {
        const data = await fetcher<TData>({
          url,
          init: fetchConfig,
          withAuthentication,
        });
        return data;
      },
      ...options,
    });
  };
}

/**
 * Generic factory function to create parameterized query hooks
 * Useful for queries that depend on parameters (e.g., fetching by ID)
 *
 * @example
 * ```ts
 * const useBook = (id: string) =>
 *   createParameterizedQuery<Book>({
 *     url: `/books/${id}`,
 *     queryKey: ["books", "detail", id],
 *   });
 * ```
 */
export function createParameterizedQuery<TData = unknown, TError = ApiError>(
  configFn: (params: any) => CreateQueryConfig<TData>,
) {
  return (params: any, options?: QueryOptions<TData, TError>) => {
    const config = configFn(params);
    return useQuery<TData, TError>({
      queryKey: config.queryKey,
      queryFn: async () => {
        const data = await fetcher<TData>({
          url: config.url,
          init: config.fetchConfig,
          withAuthentication: config.withAuthentication ?? true,
        });
        return data;
      },
      ...options,
    });
  };
}
