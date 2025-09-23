import { BaseEntity } from "./base-entity";
import { Institution } from "./institutions";

export type Course = BaseEntity & {
  name: string;
  institution: Institution;
  institutionId: string;
};
