"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default function Home({ searchParams }: PropsType) {
  // force the user to go to books page
  const router = useRouter();
  useEffect(() => {
    router.push("/books");
  }, [router]);

  return <></>;
}
