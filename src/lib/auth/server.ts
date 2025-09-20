/**
 * Server-side authentication utilities
 * Use these in Server Components, API routes, and middleware
 *
 * IMPORTANT: This file should only be imported server-side
 */

export async function getServerSession() {
  try {
    // Dynamic import to ensure this only runs server-side
    const { cookies } = await import("next/headers");
    const { SESSION_KEY } = await import("./constants");

    const cookieStore = await cookies();
    const sessionData = cookieStore.get(SESSION_KEY)?.value;

    if (!sessionData) {
      return null;
    }

    const session = JSON.parse(sessionData);

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      return null;
    }

    return session;
  } catch (error) {
    console.error("Error getting server session:", error);
    return null;
  }
}

export async function getServerToken(): Promise<string | null> {
  try {
    // Dynamic import to ensure this only runs server-side
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("accessToken")?.value || null;
  } catch (error) {
    console.error("Error getting server token:", error);
    return null;
  }
}

export async function isServerAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return session !== null;
}
