"use server";

import { fetcher } from "@/lib/fetcher";
import { redirect } from "next/navigation";

interface CreateAuthorData {
  name: string;
  biography: string;
  imageUrl: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createAuthor(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const biography = formData.get("biography") as string;
    const imageUrl = formData.get("imageUrl") as string;

    // Validate required fields
    if (!name || !biography || !imageUrl) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Validate name length
    if (name.trim().length < 2) {
      return {
        success: false,
        error: "Author name must be at least 2 characters",
      };
    }

    // Validate biography length
    if (biography.trim().length < 10) {
      return {
        success: false,
        error: "Biography must be at least 10 characters",
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

    const authorData: CreateAuthorData = {
      name: name.trim(),
      biography: biography.trim(),
      imageUrl: imageUrl.trim(),
    };

    // Call your backend API to create the author
    const newAuthor = await fetcher({
      url: "/authors",
      init: {
        method: "POST",
        body: JSON.stringify(authorData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    return {
      success: true,
      data: newAuthor,
    };
  } catch (error) {
    console.error("Error creating author:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes("409")) {
        return {
          success: false,
          error: "Author with this name already exists",
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
      error: "Failed to create author. Please try again.",
    };
  }
}

export async function createAuthorAndRedirect(formData: FormData) {
  const result = await createAuthor(formData);

  if (result.success) {
    redirect("/authors");
  }

  return result;
}
