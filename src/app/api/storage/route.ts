import { storeFile } from "@/lib/storage";
import { NextResponse } from "next/server";

const BUCKET = "visualizar-attachments";

export async function POST(request: Request) {
  const formData = await request.formData();
  const file = formData.get("file") as File;
  const path = formData.get("path") as string;

  const url = await storeFile(file, BUCKET, path);
  return NextResponse.json({ url });
}
