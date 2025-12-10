"use server";

import { fetcher } from "@/lib/fetcher";
import { Author } from "@/types/author";
import { Book } from "@/types/book";
import { Category } from "@/types/category";
import { Course } from "@/types/course";
import { redirect } from "next/navigation";

interface CreateBookData {
  name: string;
  description: string;
  imageUrl: string;
  animations: string[];
  authorId: string;
  courseId: string;
  categoryId: string;
  bookRequestId: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export const getCreateBookOptions = async (): Promise<{
  authors: Author[];
  courses: Course[];
  categories: Category[];
}> => {
  const [authors, courses, categories] = await Promise.all([
    fetcher({ url: "/authors" }),
    fetcher({ url: "/courses" }),
    fetcher({ url: "/categories" }),
  ]);

  if (!authors || !courses || !categories) {
    throw new Error("Failed to fetch data");
  }

  const authorsData = authors as Author[];
  const coursesData = courses as Course[];
  const categoriesData = categories as Category[];

  return {
    authors: authorsData,
    courses: coursesData,
    categories: categoriesData,
  };
};

export async function createBook(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const authorId = formData.get("authorId") as string;

    // Extract course ID from form data
    const courseId = formData.get("courseId") as string;
    const categoryId = formData.get("categoryId") as string;

    // Validate required fields
    if (
      !name ||
      !description ||
      !imageUrl ||
      !authorId ||
      !courseId ||
      !categoryId
    ) {
      return {
        success: false,
        error: "All fields including author are required",
      };
    }

    // Validate name length
    if (name.trim().length < 2) {
      return {
        success: false,
        error: "Book name must be at least 2 characters",
      };
    }

    // Validate description length
    if (description.trim().length < 10) {
      return {
        success: false,
        error: "Description must be at least 10 characters",
      };
    }

    // Validate URL format
    try {
      new URL(imageUrl);
    } catch {
      return {
        success: false,
        error: "Please enter a valid image URL",
      };
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(releaseDate)) {
      return {
        success: false,
        error: "Please enter a valid date",
      };
    }

    const bookData: CreateBookData = {
      name: name.trim(),
      description: description.trim(),
      imageUrl: imageUrl.trim(),
      authorId: authorId.trim(),
      courseId: courseId.trim(),
      categoryId: categoryId.trim(),
      animations: [""],
      bookRequestId: "0f9e24ee-1487-45fa-8cf8-ccbad73551d9",
    };

    // Call your backend API to create the book
    const newBook = await fetcher<Book>({
      url: "/books",
      init: {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    if ("id" in newBook) {
      return {
        success: true,
        data: newBook,
      };
    }

    return {
      success: false,
      data: undefined,
    };
  } catch (error) {
    console.error("Error creating book:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes("409")) {
        return {
          success: false,
          error: "Book with this title already exists",
        };
      }

      if (error.message.includes("404")) {
        return {
          success: false,
          error: "API endpoint not found",
        };
      }
    }

    return {
      success: false,
      error: "Failed to create book. Please try again.",
    };
  }
}

export async function createBookAndRedirect(formData: FormData) {
  const result = await createBook(formData);

  if (result.success) {
    redirect("/books");
  }

  return result;
}
