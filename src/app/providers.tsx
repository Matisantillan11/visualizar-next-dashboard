"use client";

import { SidebarProvider } from "@/components/layouts/sidebar/sidebar-context";
import { AuthProvider } from "@/contexts/auth-context";
import { ReactQueryProvider } from "@/lib/react-query";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" attribute="class">
      <ReactQueryProvider>
        <AuthProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
