import { Author } from "@/types/author";
import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { CreateAuthorInput } from "./author.types";

export const useCreateAuthor = () =>
  createMutation<Author, CreateAuthorInput>({
    url: "/authors",
    method: "POST",
    invalidateKeys: [queryKeys.authors.lists()],
  })();
