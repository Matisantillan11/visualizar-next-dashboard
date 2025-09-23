"use server";

import { fetcher } from "@/lib/fetcher";
import { redirect } from "next/navigation";

interface CreateBookData {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  authorId: string;
  courseIds: string[];
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createBook(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const imageUrl = formData.get("imageUrl") as string;
    const releaseDate = formData.get("releaseDate") as string;
    const authorId = formData.get("authorId") as string;

    // Extract course IDs from form data
    const courseIds: string[] = [];
    let index = 0;
    while (formData.get(`courseIds[${index}]`)) {
      courseIds.push(formData.get(`courseIds[${index}]`) as string);
      index++;
    }

    // Validate required fields
    if (!name || !description || !imageUrl || !releaseDate || !authorId) {
      return {
        success: false,
        error: "All fields including author are required",
      };
    }

    // Validate courses
    if (courseIds.length === 0) {
      return {
        success: false,
        error: "At least one course is required",
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
      releaseDate: releaseDate,
      authorId: authorId.trim(),
      courseIds: courseIds,
    };

    // Call your backend API to create the book
    const newBook = await fetcher({
      url: "/books",
      init: {
        method: "POST",
        body: JSON.stringify(bookData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    console.log("Book created successfully:", newBook);

    return {
      success: true,
      data: newBook,
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
