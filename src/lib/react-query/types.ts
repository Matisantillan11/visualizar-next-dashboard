import type {
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";

/**
 * Generic API response wrapper type
 */
export type ApiResponse<T> = T;

/**
 * Generic error type for API responses
 */
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

/**
 * Custom query options that extend TanStack Query's options
 */
export type QueryOptions<TData = unknown, TError = ApiError> = Omit<
  UseQueryOptions<TData, TError, TData, QueryKey>,
  "queryKey" | "queryFn"
>;

/**
 * Custom mutation options that extend TanStack Query's options
 */
export type MutationOptions<
  TData = unknown,
  TVariables = unknown,
  TError = ApiError,
  TContext = unknown,
> = Omit<UseMutationOptions<TData, TError, TVariables, TContext>, "mutationFn">;

/**
 * Query key factory type for creating hierarchical query keys
 */
export type QueryKeyFactory<T extends string = string> = {
  all: readonly [T];
  lists: () => readonly [T, "list"];
  list: (
    filters?: Record<string, unknown>,
  ) => readonly [T, "list", Record<string, unknown>];
  details: () => readonly [T, "detail"];
  detail: (id: string) => readonly [T, "detail", string];
};

/**
 * Helper type to create a query key factory for a specific resource
 */
export function createQueryKeyFactory<T extends string>(
  resource: T,
): QueryKeyFactory<T> {
  return {
    all: [resource] as const,
    lists: () => [resource, "list"] as const,
    list: (filters?: Record<string, unknown>) =>
      [resource, "list", filters ?? {}] as const,
    details: () => [resource, "detail"] as const,
    detail: (id: string) => [resource, "detail", id] as const,
  };
}
