import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { UpdateUserInput, User } from "./users.types";

export const useUpdateUser = () => {
  return createMutation<User, UpdateUserInput>({
    url: (variables) => `/users/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.users.lists(), queryKeys.users.details()],
  })();
};
