import { BaseEntity } from "@/types/base-entity";
import type { Author } from "../authors/author.types";
import type { Category } from "../categories/categories.types";
import type { Course } from "../courses/courses.types";
import { User } from "../users/users.types";

/**
 * Input type for creating a new book
 */
export interface CreateBookInput {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate?: string;
  authorId: string;
  courseId: string;
  categoryId: string;
  animations: string[];
  bookRequestId?: string;
}

/**
 * Input type for updating an existing book
 */
export interface UpdateBookInput extends Partial<CreateBookInput> {
  id: string;
  name?: string;
  description?: string;
  imageUrl?: string;
  releaseDate?: string;
  authorId?: string;
  courseId?: string;
  categoryId?: string;
  animations?: string[];
}

/**
 * Response type for fetching book creation options
 */
export interface BookCreationOptions {
  authors: Author[];
  courses: Course[];
  categories: Category[];
}

export type BookAuthor = BaseEntity & {
  authorId: string;
  bookId: string;
};

export type BookCategory = BaseEntity & {
  bookId: string;
  categoryId: string;
};

export type BookCourse = BaseEntity & {
  bookId: string;
  courseId: string;
};

export type Book = BaseEntity & {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  author: Author;
  authorId: string;
  courses: Course[];
  courseIds: string[];
  bookAuthor?: Array<BookAuthor>;
  bookCategory?: Array<BookCategory>;
  bookCourse?: Array<BookCourse>;
  bookRequestId?: string;
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
