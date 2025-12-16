import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import {
  CreateUserInput,
  DeleteUserInput,
  UpdateUserInput,
  User,
} from "./users.types";

export const useCreateUser = () => {
  return createMutation<User, CreateUserInput>({
    url: () => "/auth/create-user",
    method: "POST",
    invalidateKeys: [queryKeys.users.lists()],
  })();
};

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
