import { BaseEntity } from "./base-entity";

export type Institution = BaseEntity & {
  name: string;
  address: string;
  phone: string;
  email: string;
};
