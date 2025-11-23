"use server";

import { fetcher } from "@/lib/fetcher";
import { Role } from "@/types/user";
import { redirect } from "next/navigation";

interface CreateUserData {
  name: string;
  email: string;
  dni: string;
  role: Role;
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createUser(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const dni = formData.get("dni") as string;
    const role = formData.get("role") as Role;

    // Validate required fields
    if (!name || !email || !dni || !role) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    // Validate DNI format (7-8 digits)
    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(dni.trim())) {
      return {
        success: false,
        error: "DNI must be 7 or 8 digits",
      };
    }

    // Validate role
    if (!Object.values(Role).includes(role)) {
      return {
        success: false,
        error: "Invalid role selected",
      };
    }

    // Validate name length
    if (name.trim().length < 2) {
      return {
        success: false,
        error: "Name must be at least 2 characters",
      };
    }

    const userData: CreateUserData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      dni: dni.trim(),
      role,
    };

    // Call your backend API to create the user
    const newUser = await fetcher({
      url: "/auth/create-user",
      init: {
        method: "POST",
        body: JSON.stringify(userData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    console.log("User created successfully:", newUser);

    return {
      success: true,
      data: newUser,
    };
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes("409")) {
        return {
          success: false,
          error: "User with this email or DNI already exists",
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
      error: "Failed to create user. Please try again.",
    };
  }
}

export async function createUserAndRedirect(formData: FormData) {
  const result = await createUser(formData);

  if (result.success) {
    redirect("/users");
  }

  return result;
}
