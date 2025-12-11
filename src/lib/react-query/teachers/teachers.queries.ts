import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";
import { Teacher } from "./teachers.types";

export const useTeachers = () => {
  return createQuery<Array<Teacher>>({
    url: "/teachers",
    queryKey: queryKeys.teachers.lists(),
  })();
};
