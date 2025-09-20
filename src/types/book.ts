import { BaseEntity } from "./base-entity";

export type Book = BaseEntity & {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
};
