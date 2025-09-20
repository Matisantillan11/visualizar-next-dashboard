import { supabase } from "@/lib/auth/supabase";
import type { AuthUser, AuthSession, AuthResponse } from "./types";
import { fetcher } from "../fetcher";
import { SESSION_KEY } from "./constants";

export const sendOTP = async (email: string): Promise<void> => {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  if (error) {
    throw new Error(error.message);
  }
};

export const verifyOTP = async (
  email: string,
  token: string,
): Promise<AuthSession | undefined> => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    throw new Error(error.message);
  }

  if (!data.user || !data.session) {
    throw new Error("Authentication failed");
  }

  const internalAuth = await fetcher<AuthResponse>({
    url: `/auth/login`,
    init: {
      method: "POST",
      body: JSON.stringify({
        email,
        supabaseUserId: data.user.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    },
  });

  if (internalAuth) {
    const authUser: AuthUser = {
      id: internalAuth.user.id,
      name: internalAuth.user.name ?? "",
      role: internalAuth.user.role,
      supabaseUserId: data.user.id,
      email: data.user.email!,
    };

    const authSession: AuthSession = {
      user: authUser,
      token: data.session.access_token,
      accessToken: internalAuth.access_token,
      expiresAt: new Date(data.session.expires_at! * 1000).getTime(),
    };

    return authSession;
  }

  return undefined;
};

// Get current session
export const getCurrentSession = async (): Promise<AuthSession | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  const storedSession = localStorage.getItem(SESSION_KEY);

  if (error || !session || !storedSession) {
    return null;
  }

  const storedSessionData = JSON.parse(storedSession);

  const authUser: AuthUser = {
    id: storedSessionData.user.id,
    role: storedSessionData.user.role,
    supabaseUserId: session.user.id,
    email: session.user.email!,
    name: storedSessionData.user.name ?? "",
  };

  return {
    user: authUser,
    token: session.access_token,
    accessToken: storedSessionData.access_token,
    expiresAt: new Date(session.expires_at! * 1000).getTime(),
  };
};

// Sign out
export const supabaseSignOut = async (): Promise<void> => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
};

// Listen to auth state changes
export const onAuthStateChange = async (
  callback: (session: AuthSession | null) => void,
) => {
  return supabase.auth.onAuthStateChange(async (event: any, session: any) => {
    const storedSession = localStorage.getItem(SESSION_KEY);
    if (session && storedSession) {
      const storedSessionData = JSON.parse(storedSession);
      const authUser: AuthUser = {
        id: storedSessionData.user.id,
        role: storedSessionData.user.role,
        supabaseUserId: session.user.id,
        email: session.user.email!,
        name: storedSessionData.user.name ?? "",
      };

      const authSession: AuthSession = {
        user: authUser,
        token: session.access_token,
        accessToken: storedSessionData.access_token,
        expiresAt: new Date(session.expires_at! * 1000).getTime(),
      };

      callback(authSession);
    } else {
      callback(null);
    }
  });
};
