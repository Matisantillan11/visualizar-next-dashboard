import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { DeleteUserInput, UpdateUserInput, User } from "./users.types";

export const useUpdateUser = () => {
  return createMutation<User, UpdateUserInput>({
    url: (variables) => `/users/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.users.lists(), queryKeys.users.details()],
  })();
};

export const useDeleteUser = () => {
  return createMutation<User, DeleteUserInput>({
    url: (variables) => `/users/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.users.lists()],
  })();
};
