import { Institution } from "@/lib/react-query/institutions/institutions.types";
import { BaseEntity } from "@/types/base-entity";

export type InstitutionCourse = BaseEntity & {
  courseId: string;
  institution: Institution;
  institutionId: string;
};

export type Course = BaseEntity & {
  name: string;
  InstitutionCourse: InstitutionCourse[];
};

export type CreateCourseInput = {
  name: string;
  institutionId: string;
};

export type UpdateCourseInput = {
  id: string;
  name?: string;
  institutionId?: string;
  institutionCourseId?: string;
};
  