import { BaseEntity } from "./base-entity";
import { Author } from "./author";
import { Course } from "./course";

export type Book = BaseEntity & {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  author: Author;
  authorId: string;
  courses: Course[];
  courseIds: string[];
};
