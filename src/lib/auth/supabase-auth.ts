import { supabase } from "@/lib/auth/supabase";
import type { AuthUser, AuthSession } from "./types";
import { fetcher } from "../fetcher";

export const sendOTP = async (email: string): Promise<void> => {
  const internalUser = await fetcher({
    url: `/users/search`,
    init: {
      method: "POST",
      body: JSON.stringify({
        email: "matias1.santillan@gmail.com",
      }),
    },
  });

  console.log({
    internalUser,
  });

  if (internalUser) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  }
};

export const verifyOTP = async (
  email: string,
  token: string,
): Promise<AuthSession> => {
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

  const authUser: AuthUser = {
    id: data.user.id,
    email: data.user.email!,
    name: data.user.user_metadata?.full_name || data.user.email?.split("@")[0],
  };

  const authSession: AuthSession = {
    user: authUser,
    token: data.session.access_token,
    expiresAt: new Date(data.session.expires_at! * 1000).getTime(),
  };

  return authSession;
};

// Get current session
export const getCurrentSession = async (): Promise<AuthSession | null> => {
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  const authUser: AuthUser = {
    id: session.user.id,
    email: session.user.email!,
    name:
      session.user.user_metadata?.full_name ||
      session.user.email?.split("@")[0],
  };

  return {
    user: authUser,
    token: session.access_token,
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
    if (session) {
      const authUser: AuthUser = {
        id: session.user.id,
        email: session.user.email!,
        name:
          session.user.user_metadata?.full_name ||
          session.user.email?.split("@")[0],
      };

      const authSession: AuthSession = {
        user: authUser,
        token: session.access_token,
        expiresAt: new Date(session.expires_at! * 1000).getTime(),
      };

      callback(authSession);
    } else {
      callback(null);
    }
  });
};
