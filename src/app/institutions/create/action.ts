"use server";

import { fetcher } from "@/lib/fetcher";
import { redirect } from "next/navigation";

interface CreateInstitutionData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

interface ActionResult {
  success: boolean;
  error?: string;
  data?: any;
}

export async function createInstitution(
  formData: FormData,
): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;

    // Validate required fields
    if (!name || !address || !phone || !email) {
      return {
        success: false,
        error: "All fields are required",
      };
    }

    // Validate name length
    if (name.trim().length < 2) {
      return {
        success: false,
        error: "Institution name must be at least 2 characters",
      };
    }

    // Validate address length
    if (address.trim().length < 5) {
      return {
        success: false,
        error: "Address must be at least 5 characters",
      };
    }

    // Validate phone format
    if (!/^[\d\s\-\+\(\)]+$/.test(phone.trim())) {
      return {
        success: false,
        error: "Please enter a valid phone number",
      };
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return {
        success: false,
        error: "Please enter a valid email address",
      };
    }

    const institutionData: CreateInstitutionData = {
      name: name.trim(),
      address: address.trim(),
      phone: phone.trim(),
      email: email.trim().toLowerCase(),
    };

    // Call your backend API to create the institution
    const newInstitution = await fetcher({
      url: "/institutions",
      init: {
        method: "POST",
        body: JSON.stringify(institutionData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });

    console.log("Institution created successfully:", newInstitution);

    return {
      success: true,
      data: newInstitution,
    };
  } catch (error) {
    console.error("Error creating institution:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes("409")) {
        return {
          success: false,
          error: "Institution with this name or email already exists",
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
      error: "Failed to create institution. Please try again.",
    };
  }
}

export async function createInstitutionAndRedirect(formData: FormData) {
  const result = await createInstitution(formData);

  if (result.success) {
    redirect("/institutions");
  }

  return result;
}
