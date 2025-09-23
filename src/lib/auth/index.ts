import { redirect } from "next/navigation";
import { SESSION_KEY } from "./constants";
import { AuthSession } from "./types";
import { setCookie, deleteCookie } from "cookies-next/client";
import { clientCookies } from "./cookies";
import { sendOTP, verifyOTP } from "./otp-auth";

export const setSession = (session: AuthSession): void => {
  if (typeof window === "undefined") return;

  // Store session data in cookies instead of localStorage
  setCookie(SESSION_KEY, JSON.stringify(session), {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  // Set access token using our cookie utility
  clientCookies.setAccessToken(session.accessToken);
};

export const getSession = async (): Promise<AuthSession | null> => {
  // Get session from cookies
  let sessionData: string | null = null;

  if (typeof window !== "undefined") {
    // Client-side: use cookies-next client
    const { getCookie } = await import("cookies-next/client");
    sessionData = getCookie(SESSION_KEY) as string | null;
  } else {
    // Server-side: use Next.js cookies
    try {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      sessionData = cookieStore.get(SESSION_KEY)?.value || null;
    } catch (error) {
      console.error("Error accessing server cookies:", error);
      return null;
    }
  }

  if (!sessionData) return null;

  try {
    const session: AuthSession = JSON.parse(sessionData);

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      if (typeof window !== "undefined") {
        clearSession();
      }
      return null;
    }

    return session;
  } catch {
    if (typeof window !== "undefined") {
      clearSession();
    }
    return null;
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return clientCookies.getAccessToken();
};

export const clearSession = async (): Promise<void> => {
  if (typeof window === "undefined") return;
  // Clear all cookies
  deleteCookie(SESSION_KEY);
  clientCookies.clearTokens();
};

export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  return session !== null;
};

// Verify OTP code
export const onVerifyOTP = async (
  email: string,
  token: string,
): Promise<AuthSession | undefined> => {
  const session = await verifyOTP(email, token);
  if (session) {
    setSession(session);
  }
  return session;
};

// Legacy signIn function for compatibility (now sends OTP)
export const signIn = async (email: string): Promise<void> => {
  return sendOTP(email);
};

export const signOut = async (): Promise<void> => {
  await clearSession();
  // Redirect to sign-in page
  redirect("/auth/sign-in");
};

// Export OTP functions
export { sendOTP } from "./otp-auth";
