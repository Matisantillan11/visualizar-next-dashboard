import {
  Author,
  DeleteAuthorInput,
  UpdateAuthorInput,
} from "@/lib/react-query/authors/author.types";
import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { CreateAuthorInput } from "./author.types";

export const useCreateAuthor = () =>
  createMutation<Author, CreateAuthorInput>({
    url: "/authors",
    method: "POST",
    invalidateKeys: [queryKeys.authors.lists()],
  })();

export const useUpdateAuthor = () => {
  return createMutation<Author, UpdateAuthorInput>({
    url: (variables) => `/authors/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.authors.lists()],
  })();
};

export const useDeleteAuthor = () => {
  return createMutation<Author, DeleteAuthorInput>({
    url: (variables) => `/authors/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.authors.lists()],
  })();
};
