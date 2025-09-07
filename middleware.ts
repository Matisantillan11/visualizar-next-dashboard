import { NextRequest, NextResponse } from "next/server";
import { TOKEN_KEY } from "@/lib/auth/constants";

const publicRoutes = ["/auth/sign-in", "/auth/forgot-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route),
  );

  const token = request.cookies.has(TOKEN_KEY);

  // If user is not authenticated and trying to access protected route
  if (!isPublicRoute && !token) {
    const signInUrl = new URL("/auth/sign-in", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isPublicRoute && token) {
    const dashboardUrl = new URL("/", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
