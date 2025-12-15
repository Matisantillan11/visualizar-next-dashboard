import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { DeleteTeacherInput } from "./teachers.types";

export const useDeleteTeacher = () => {
  return createMutation<void, DeleteTeacherInput>({
    url: (variables) => `/teachers/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.teachers.lists()],
  })();
};
