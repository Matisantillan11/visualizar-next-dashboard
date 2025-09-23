"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Since we're using OTP-based auth directly on the sign-in page,
    // this callback page is no longer needed. Redirect to sign-in.
    router.push("/auth/sign-in");
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-2 dark:bg-[#020d1a]">
      <div className="flex items-center space-x-2">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
        <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
          Redirecting...
        </span>
      </div>
    </div>
  );
}
