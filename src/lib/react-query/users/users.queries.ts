import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";
import { User } from "./users.types";

export const useUsers = () => {
  return createQuery<Array<User>>({
    url: "/users",
    queryKey: queryKeys.users.list(),
  })();
};
