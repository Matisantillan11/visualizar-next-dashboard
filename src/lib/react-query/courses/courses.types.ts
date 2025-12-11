import { BaseEntity } from "@/types/base-entity";
import { Institution } from "@/types/institutions";

export type Course = BaseEntity & {
  name: string;
  institution: Institution;
  institutionId: string;
};

export type CreateCourseInput = {
  name: string;
  institutionId: string;
};
