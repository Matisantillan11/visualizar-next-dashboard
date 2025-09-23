import { fetcher } from "@/lib/fetcher";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call your backend API to get courses
    const courses = await fetcher({
      url: "/courses",
      init: {
        method: "GET",
      },
    });

    return NextResponse.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);

    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 },
    );
  }
}
