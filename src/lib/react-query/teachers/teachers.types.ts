import { BaseEntity } from "@/types/base-entity";
import { User } from "../users/users.types";

export type Teacher = BaseEntity & {
  user: User;
  userId?: string;
};

export type DeleteTeacherInput = {
  id: string;
};
