import { fetcher } from "@/lib/fetcher";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Call your backend API to get institutions
    const institutions = await fetcher({
      url: "/institutions",
      init: {
        method: "GET",
      },
    });

    return NextResponse.json(institutions);
  } catch (error) {
    console.error("Error fetching institutions:", error);

    return NextResponse.json(
      { error: "Failed to fetch institutions" },
      { status: 500 },
    );
  }
}
