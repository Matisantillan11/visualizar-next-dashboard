import { BaseEntity } from "@/types/base-entity";
import { User } from "../users/users.types";

export type Student = BaseEntity & {
  user: User;
  userId?: string;
};

export type DeleteStudentInput = {
  id: string;
};
