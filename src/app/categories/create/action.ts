"use server";

import { fetcher } from "@/lib/fetcher";
import { redirect } from "next/navigation";

interface CreateCategoryData {
  name: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createCategory(
  formData: FormData,
): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;

    // Validate required fields
    if (!name) {
      return {
        success: false,
        error: "Category name is required",
      };
    }

    // Validate name length
    if (name.trim().length < 2) {
      return {
        success: false,
        error: "Category name must be at least 2 characters",
      };
    }

    const categoryData: CreateCategoryData = {
      name: name.trim(),
    };

    // Call your backend API to create the category
    const newCategory = await fetcher({
      url: "/categories",
      init: {
        method: "POST",
        body: JSON.stringify(categoryData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    console.log("Category created successfully:", newCategory);

    return {
      success: true,
      data: newCategory,
    };
  } catch (error) {
    console.error("Error creating category:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes("409")) {
        return {
          success: false,
          error: "Category with this name already exists",
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
      error: "Failed to create category. Please try again.",
    };
  }
}

export async function createCategoryAndRedirect(formData: FormData) {
  const result = await createCategory(formData);

  if (result.success) {
    redirect("/categories");
  }

  return result;
}
