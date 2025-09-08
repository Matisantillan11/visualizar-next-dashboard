import { redirect } from "next/navigation";
import { SESSION_KEY, TOKEN_KEY } from "./constants";
import { AuthSession } from "./types";
import { setCookie, deleteCookie } from "cookies-next/client";
import {
  getCurrentSession,
  sendOTP,
  supabaseSignOut,
  verifyOTP,
} from "./supabase-auth";

export const setSession = (session: AuthSession): void => {
  if (typeof window === "undefined") return;

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(TOKEN_KEY, session.token);

  // Also set cookie for middleware
  setCookie(TOKEN_KEY, session.token, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: "/",
    sameSite: "lax",
  });
};

export const getSession = async (): Promise<AuthSession | null> => {
  if (typeof window === "undefined") return null;

  // First try to get session from Supabase
  try {
    const supabaseSession = await getCurrentSession();
    if (supabaseSession) {
      // Update local storage with fresh session
      setSession(supabaseSession);
      return supabaseSession;
    }
  } catch (error) {
    console.error("Error getting Supabase session:", error);
  }

  // Fallback to local storage
  const sessionData = localStorage.getItem(SESSION_KEY);
  if (!sessionData) return null;

  try {
    const session: AuthSession = JSON.parse(sessionData);

    // Check if session is expired
    if (Date.now() > session.expiresAt) {
      clearSession();
      return null;
    }

    return session;
  } catch {
    clearSession();
    return null;
  }
};

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
};

export const clearSession = async (): Promise<void> => {
  if (typeof window === "undefined") return;

  // Sign out from Supabase
  try {
    await supabaseSignOut();
  } catch (error) {
    console.error("Error signing out from Supabase:", error);
  }

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);

  // Clear cookie
  deleteCookie(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

// Verify OTP code
export const onVerifyOTP = async (
  email: string,
  token: string,
): Promise<AuthSession> => {
  const session = await verifyOTP(email, token);
  setSession(session);
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

export { onAuthStateChange, sendOTP } from "./supabase-auth";
