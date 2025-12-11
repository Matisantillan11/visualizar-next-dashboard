import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type { Course, CreateCourseInput } from "./courses.types";

export const useCreateCourse = () => {
  return createMutation<Course, CreateCourseInput>({
    url: "/courses",
    method: "POST",
    invalidateKeys: [queryKeys.courses.lists()],
  })();
};
