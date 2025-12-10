"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { createQueryClient } from "./config";

/**
 * Provider component for TanStack Query
 * Wraps the application with QueryClientProvider and includes DevTools in development
 */
export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Create a stable QueryClient instance
  // Using useState ensures the client is only created once per component mount
  const [queryClient] = useState(() => createQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only show DevTools in development */}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}
