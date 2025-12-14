"use client";

import { Header } from "@/components/layouts/header";
import { Sidebar } from "@/components/layouts/sidebar";
import { ProtectedLayout } from "@/components/ProtectedLayout";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

export function AppContent({ children }: PropsWithChildren) {
  const pathname = usePathname();

  // Check if current route is an auth route
  const isAuthRoute = pathname.startsWith("/auth/");

  // For auth routes, render without sidebar and header
  if (isAuthRoute) {
    return <>{children}</>;
  }

  // For protected routes, wrap with ProtectedLayout and include sidebar/header
  return (
    <ProtectedLayout>
      <div className="flex min-h-screen">
        <Sidebar />

        <div className="w-full bg-gray-2 dark:bg-[#020d1a]">
          <Header />

          <main className="isolate mx-auto w-full max-w-screen-2xl overflow-hidden p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
