import { Institution } from "@/lib/react-query/institutions/institutions.types";
import { BaseEntity } from "@/types/base-entity";

export type Course = BaseEntity & {
  name: string;
  institution: Institution;
  institutionId: string;
};

export type CreateCourseInput = {
  name: string;
  institutionId: string;
};
