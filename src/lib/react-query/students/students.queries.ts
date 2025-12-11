import { createQuery } from "../query-factory";
import { queryKeys } from "../query-keys";
import { Student } from "./students.types";

export const useStudents = () => {
  return createQuery<Array<Student>>({
    url: "/students",
    queryKey: queryKeys.students.lists(),
  })();
};
