import { Author } from "./author";
import { BaseEntity } from "./base-entity";
import { Course } from "./course";
import { User } from "./user";

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

enum AnimationType {
  ALL,
  MAIN,
  EXTRA,
}

export enum BookRequestStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  DENIED = "DENIED",
  PUBLISHED = "PUBLISHED",
}

export type BookRequestCourse = BaseEntity & {
  bookRequestId: string;
  courseId: string;
  course: Course;
};

export type BookRequest = BaseEntity & {
  userId: string;
  title: string;
  authorName: string;
  comments: string;
  animations: Array<AnimationType>;
  status: BookRequestStatus;
  user: User;
  bookRequestCourse: Array<BookRequestCourse>;
};
