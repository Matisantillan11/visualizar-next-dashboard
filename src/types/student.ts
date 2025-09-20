import { BaseEntity } from "./base-entity";
import { User } from "./user";

export type Student = BaseEntity & {
  user: User;
  userId?: string;
};
