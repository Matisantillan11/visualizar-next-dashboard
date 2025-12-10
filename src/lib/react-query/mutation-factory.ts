import { fetcher } from "@/lib/fetcher";
import {
  useMutation,
  useQueryClient,
  type QueryKey,
} from "@tanstack/react-query";
import type { ApiError, MutationOptions } from "./types";

/**
 * Configuration for creating a mutation hook
 */
interface CreateMutationConfig<TData, TVariables> {
  /**
   * The API endpoint URL (can be a function for dynamic URLs)
   */
  url: string | ((variables: TVariables) => string);
  /**
   * HTTP method for the mutation
   */
  method: "POST" | "PUT" | "PATCH" | "DELETE";
  /**
   * Query keys to invalidate after successful mutation
   */
  invalidateKeys?: QueryKey[];
  /**
   * Whether to include authentication headers (default: true)
   */
  withAuthentication?: boolean;
  /**
   * Optional callback after successful mutation
   */
  onSuccessCallback?: (
    data: TData,
    variables: TVariables,
  ) => void | Promise<void>;
}

/**
 * Generic factory function to create type-safe mutation hooks
 * Integrates with the existing fetcher utility and handles cache invalidation
 *
 * @example
 * ```ts
 * const useCreateBook = createMutation<Book, CreateBookInput>({
 *   url: "/books",
 *   method: "POST",
 *   invalidateKeys: [["books", "list"]],
 * });
 * ```
 */
export function createMutation<
  TData = unknown,
  TVariables = unknown,
  TError = ApiError,
  TContext = unknown,
>({
  url,
  method,
  invalidateKeys = [],
  withAuthentication = true,
  onSuccessCallback,
}: CreateMutationConfig<TData, TVariables>) {
  return (options?: MutationOptions<TData, TVariables, TError, TContext>) => {
    const queryClient = useQueryClient();

    // Extract onSuccess from options to handle separately
    const { onSuccess: userOnSuccess, ...restOptions } = options || {};

    return useMutation<TData, TError, TVariables, TContext>({
      mutationFn: async (variables: TVariables) => {
        const endpoint = typeof url === "function" ? url(variables) : url;

        const data = await fetcher<TData>({
          url: endpoint,
          init: {
            method,
            body: JSON.stringify(variables),
            headers: {
              "Content-Type": "application/json",
            },
          },
          withAuthentication,
        });

        return data;
      },
      onSuccess: async (data, variables, mutationResult, context) => {
        // Invalidate specified query keys to refetch data
        if (invalidateKeys.length > 0) {
          await Promise.all(
            invalidateKeys.map((key) =>
              queryClient.invalidateQueries({ queryKey: key }),
            ),
          );
        }

        // Call custom success callback if provided
        if (onSuccessCallback) {
          await onSuccessCallback(data, variables);
        }

        // Call user-provided onSuccess if exists
        if (userOnSuccess) {
          await userOnSuccess(data, variables, mutationResult, context);
        }
      },
      ...restOptions,
    });
  };
}

/**
 * Factory for creating DELETE mutations
 * Simplified version for delete operations that typically only need an ID
 *
 * @example
 * ```ts
 * const useDeleteBook = createDeleteMutation<void>({
 *   url: (id) => `/books/${id}`,
 *   invalidateKeys: [["books", "list"]],
 * });
 * ```
 */
export function createDeleteMutation<
  TData = void,
  TError = ApiError,
  TContext = unknown,
>({
  url,
  invalidateKeys = [],
  withAuthentication = true,
  onSuccessCallback,
}: Omit<CreateMutationConfig<TData, string>, "method">) {
  return createMutation<TData, string, TError, TContext>({
    url,
    method: "DELETE",
    invalidateKeys,
    withAuthentication,
    onSuccessCallback,
  });
}
