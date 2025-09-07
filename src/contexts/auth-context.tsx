"use client";

import { getSession, signIn, signOut } from "@/lib/auth";
import { AuthUser } from "@/lib/auth/types";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount
    const session = getSession();
    if (session) {
      setUser(session.user);
    }
    setIsLoading(false);
  }, []);

  const handleSignIn = async (email: string, password: string) => {
    try {
      const session = await signIn(email, password);
      setUser(session.user);
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = () => {
    signOut();
    setUser(null);
    router.push("/auth/sign-in");
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    signIn: handleSignIn,
    signOut: handleSignOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
