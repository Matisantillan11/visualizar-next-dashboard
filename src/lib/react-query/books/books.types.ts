import type { Author } from "@/types/author";
import type { Book } from "@/types/book";
import type { Category } from "@/types/category";
import type { Course } from "@/types/course";

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
}

/**
 * Response type for fetching book creation options
 */
export interface BookCreationOptions {
  authors: Author[];
  courses: Course[];
  categories: Category[];
}

/**
 * Re-export Book type for convenience
 */
export type { Book };
