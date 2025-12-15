import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import { DeleteStudentInput } from "./students.types";

export const useDeleteStudent = () => {
  return createMutation<void, DeleteStudentInput>({
    url: (variables) => `/students/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.students.lists()],
  })();
};
