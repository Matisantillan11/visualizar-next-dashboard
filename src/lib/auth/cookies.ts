import { getCookie, setCookie, deleteCookie } from "cookies-next";

const ACCESS_TOKEN_KEY = "accessToken";
const REFRESH_TOKEN_KEY = "refreshToken";

// Cookie options for security
const cookieOptions = {
  httpOnly: false, // Set to true if you want server-only access
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 60 * 60 * 24 * 7, // 7 days
  path: "/",
};

// Client-side cookie utilities
export const clientCookies = {
  setAccessToken: (token: string) => {
    setCookie(ACCESS_TOKEN_KEY, token, cookieOptions);
  },

  getAccessToken: (): string | null => {
    return getCookie(ACCESS_TOKEN_KEY) as string | null;
  },

  setRefreshToken: (token: string) => {
    setCookie(REFRESH_TOKEN_KEY, token, {
      ...cookieOptions,
      httpOnly: true, // Refresh token should be httpOnly for security
    });
  },

  getRefreshToken: (): string | null => {
    return getCookie(REFRESH_TOKEN_KEY) as string | null;
  },

  clearTokens: () => {
    deleteCookie(ACCESS_TOKEN_KEY);
    deleteCookie(REFRESH_TOKEN_KEY);
  },
};

// Universal function that works on both client and server
export const getAccessToken = async (): Promise<string | null> => {
  // Check if we're on the server
  if (typeof window === "undefined") {
    try {
      // Dynamic import to avoid bundling next/headers on client
      const { getServerToken } = await import("./server");
      return await getServerToken();
    } catch (error) {
      console.error("Error getting server token:", error);
      return null;
    }
  }

  // Client-side
  return clientCookies.getAccessToken();
};

export const getRefreshToken = async (): Promise<string | null> => {
  // Check if we're on the server
  if (typeof window === "undefined") {
    try {
      // Dynamic import to avoid bundling next/headers on client
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      return cookieStore.get(REFRESH_TOKEN_KEY)?.value || null;
    } catch (error) {
      console.error("Error getting server refresh token:", error);
      return null;
    }
  }

  // Client-side
  return clientCookies.getRefreshToken();
};
