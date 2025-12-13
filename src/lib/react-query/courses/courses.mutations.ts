import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type {
  Course,
  CreateCourseInput,
  UpdateCourseInput,
} from "./courses.types";

export const useCreateCourse = () => {
  return createMutation<Course, CreateCourseInput>({
    url: "/courses",
    method: "POST",
    invalidateKeys: [queryKeys.courses.lists()],
  })();
};

export const useUpdateCourse = (id?: string) => {
  return createMutation<Course, UpdateCourseInput>({
    url: `/courses/${id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.courses.lists()],
  })();
};
