import { BaseEntity } from "./base-entity";

export type Author = BaseEntity & {
  name: string;
  biography: string;
  imageUrl: string;
};
