import { createMutation } from "../mutation-factory";
import { queryKeys } from "../query-keys";
import type {
  Course,
  CreateCourseInput,
  DeleteCourseInput,
  UpdateCourseInput,
} from "./courses.types";

export const useCreateCourse = () => {
  return createMutation<Course, CreateCourseInput>({
    url: "/courses",
    method: "POST",
    invalidateKeys: [queryKeys.courses.lists()],
  })();
};

export const useUpdateCourse = () => {
  return createMutation<Course, UpdateCourseInput>({
    url: (variables) => `/courses/${variables.id}`,
    method: "PUT",
    invalidateKeys: [queryKeys.courses.lists()],
  })();
};

export const useDeleteCourse = () => {
  return createMutation<Course, DeleteCourseInput>({
    url: (variables) => `/courses/${variables.id}`,
    method: "DELETE",
    invalidateKeys: [queryKeys.courses.lists()],
  })();
};
