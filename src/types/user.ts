import { BaseEntity } from "./base-entity";

export enum Role {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT",
  TEACHER = "TEACHER",
  INSTITUTION = "INSTITUTION",
}

export type User = BaseEntity & {
  email: string;
  name: string;
  dni: string;
  role: Role;
};
