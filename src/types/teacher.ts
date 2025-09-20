import { BaseEntity } from "./base-entity";
import { User } from "./user";

export type Teacher = BaseEntity & {
  user: User;
  userId?: string;
};
