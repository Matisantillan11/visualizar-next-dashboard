import { redirect } from "next/navigation";
import { SESSION_KEY, TOKEN_KEY } from "./constants";
import { AuthSession } from "./types";
import { setCookie, deleteCookie } from "cookies-next/client";

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

export const getSession = (): AuthSession | null => {
  if (typeof window === "undefined") return null;

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

export const clearSession = (): void => {
  if (typeof window === "undefined") return;

  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);

  // Clear cookie
  deleteCookie(TOKEN_KEY);
};

export const isAuthenticated = (): boolean => {
  return getSession() !== null;
};

// Mock authentication - replace with your actual authentication logic
export const signIn = async (
  email: string,
  password: string,
): Promise<AuthSession> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Mock validation - replace with actual authentication
  if (email && password) {
    const session: AuthSession = {
      user: {
        id: "1",
        email,
        name: email.split("@")[0],
      },
      token: "mock_jwt_token_" + Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    setSession(session);
    return session;
  }

  throw new Error("Invalid credentials");
};

export const signOut = (): void => {
  clearSession();
  // Redirect to sign-in page
  redirect("/auth/sign-in");
};
