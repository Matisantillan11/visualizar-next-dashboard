import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type {
  Category,
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategoryInput,
} from "./categories.types";

export function useCreateCategory() {
  return createMutation<Category, CreateCategoryInput>({
    url: "/categories",
    method: "POST",
    invalidateKeys: [queryKeys.categories.lists()],
  })();
}

export const useUpdateCategory = () => {
  return createMutation<Category, UpdateCategoryInput>({
    url: (variables) => `/categories/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.categories.lists()],
  })();
};

export const useDeleteCategory = () => {
  return createMutation<Category, DeleteCategoryInput>({
    url: (variables) => `/categories/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.categories.lists()],
  })();
};
