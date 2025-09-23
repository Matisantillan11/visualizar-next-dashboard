import { fetcher } from "@/lib/fetcher";
import { Role } from "@/types/user";
import { NextRequest, NextResponse } from "next/server";

interface CreateUserRequest {
  name: string;
  email: string;
  dni: string;
  role: Role;
}

export async function POST(request: NextRequest) {
  try {
    const body: CreateUserRequest = await request.json();

    // Validate request body
    if (!body.name || !body.email || !body.dni || !body.role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate DNI format (7-8 digits)
    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(body.dni)) {
      return NextResponse.json(
        { error: "DNI must be 7 or 8 digits" },
        { status: 400 },
      );
    }

    // Validate role
    if (!Object.values(Role).includes(body.role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    // Call your backend API to create the user
    const newUser = await fetcher({
      url: "/users",
      init: {
        method: "POST",
        body: JSON.stringify({
          name: body.name.trim(),
          email: body.email.trim().toLowerCase(),
          dni: body.dni.trim(),
          role: body.role,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      withAuthentication: true,
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);

    // Handle different types of errors
    if (error instanceof Error) {
      // Check if it's a network/API error
      if (error.message.includes("404")) {
        return NextResponse.json(
          { error: "API endpoint not found" },
          { status: 404 },
        );
      }

      if (error.message.includes("409")) {
        return NextResponse.json(
          { error: "User with this email or DNI already exists" },
          { status: 409 },
        );
      }
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
