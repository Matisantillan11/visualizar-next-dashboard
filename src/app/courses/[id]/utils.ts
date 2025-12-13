import { Course } from "@/lib/react-query/courses/courses.types";

export type CourseResponse = {
  name: string;
  institutionCourseId: string;
  institution: {
    id: string;
    name: string;
  };
};

export const parseCourse = (course: Course): CourseResponse => {
  const { InstitutionCourse, ...rest } = course;
  return {
    ...rest,
    institutionCourseId: InstitutionCourse?.[0]?.id,
    institution: {
      id: InstitutionCourse?.[0]?.institution.id,
      name: InstitutionCourse?.[0]?.institution.name,
    },
  };
};
