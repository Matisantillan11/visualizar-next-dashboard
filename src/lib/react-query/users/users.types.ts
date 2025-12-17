import { BaseEntity } from "@/types/base-entity";

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
  courseId: string;
};

export type CreateUserInput = {
  email: string;
  name: string;
  dni: string;
  role: Role;
};

export type UpdateUserInput = {
  id?: string;
  email?: string;
  name?: string | null;
  dni?: string;
  role?: Role;
};


export type DeleteUserInput = {
  id: string;
};
