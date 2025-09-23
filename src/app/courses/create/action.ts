"use server";

import { fetcher } from "@/lib/fetcher";
import { redirect } from "next/navigation";

interface CreateCourseData {
  name: string;
  institutionId: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createCourse(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const institutionId = formData.get("institutionId") as string;

    // Validate required fields
    if (!name || !institutionId) {
      return {
        success: false,
        error: "Course name and institution are required",
      };
    }

    // Validate name length
    if (name.trim().length < 2) {
      return {
        success: false,
        error: "Course name must be at least 2 characters",
      };
    }

    const courseData: CreateCourseData = {
      name: name.trim(),
      institutionId: institutionId.trim(),
    };

    // Call your backend API to create the course
    const newCourse = await fetcher({
      url: "/courses",
      init: {
        method: "POST",
        body: JSON.stringify(courseData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    console.log("Course created successfully:", newCourse);

    return {
      success: true,
      data: newCourse,
    };
  } catch (error) {
    console.error("Error creating course:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes("409")) {
        return {
          success: false,
          error: "Course with this name already exists",
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
      error: "Failed to create course. Please try again.",
    };
  }
}

export async function createCourseAndRedirect(formData: FormData) {
  const result = await createCourse(formData);

  if (result.success) {
    redirect("/courses");
  }

  return result;
}
