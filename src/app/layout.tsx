import "@/css/satoshi.css";
import "@/css/style.css";

import "flatpickr/dist/flatpickr.min.css";
import "jsvectormap/dist/jsvectormap.css";

import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import type { PropsWithChildren } from "react";
import { AppContent } from "../components/layouts/app-content";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Visualizar Dashboard",
  description: "Visualizar Dashboard",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <NextTopLoader color="#5750F1" showSpinner={false} />
          <AppContent>{children}</AppContent>
        </Providers>
      </body>
    </html>
  );
}
