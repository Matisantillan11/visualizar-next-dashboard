import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type {
  Category,
  CreateCategoryInput,
  UpdateCategoryInput,
} from "./categories.types";

export function useCreateCategory() {
  return createMutation<Category, CreateCategoryInput>({
    url: "/categories",
    method: "POST",
    invalidateKeys: [queryKeys.categories.lists()],
  })();
}

export const useUpdateCategory = (id?: string) => {
  return createMutation<Category, UpdateCategoryInput>({
    url: `/categories/${id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.categories.lists()],
  })();
};
