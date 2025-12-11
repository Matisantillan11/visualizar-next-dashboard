import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type { Category, CreateCategoryInput } from "./categories.types";

export function useCreateCategory() {
  return createMutation<Category, CreateCategoryInput>({
    url: "/categories",
    method: "POST",
    invalidateKeys: [queryKeys.categories.lists()],
  })();
}
