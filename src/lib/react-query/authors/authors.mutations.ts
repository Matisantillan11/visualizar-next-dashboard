import {
  Author,
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

export const useUpdateAuthor = (id?: string) => {
  return createMutation<Author, UpdateAuthorInput>({
    url: `/authors/${id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.authors.lists()],
  })();
};
