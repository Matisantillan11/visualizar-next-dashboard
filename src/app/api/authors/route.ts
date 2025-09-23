import { fetcher } from "@/lib/fetcher";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call your backend API to get authors
    const authors = await fetcher({
      url: "/authors",
      init: {
        method: "GET",
      },
    });

    return NextResponse.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);

    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 },
    );
  }
}
