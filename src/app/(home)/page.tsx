"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  // force the user to go to books page
  const router = useRouter();
  useEffect(() => {
    router.push("/books");
  }, [router]);

  return <></>;
}
