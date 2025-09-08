"use client";
import {
  getSession,
  onAuthStateChange,
  onVerifyOTP,
  sendOTP,
  signOut,
} from "@/lib/auth";
import { AuthUser } from "@/lib/auth/types";
import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  sendOTP: (email: string) => Promise<void>;
  verifyOTP: (email: string, token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check for existing session on mount
    const checkSession = async () => {
      try {
        const session = await getSession();
        if (session) {
          setUser(session.user);
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    const checkAuthState = async () => {
      const {
        data: { subscription },
      } = await onAuthStateChange((session) => {
        if (session) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      });

      return () => subscription.unsubscribe();
    };
    checkAuthState();
  }, []);

  const handleSendOTP = async (email: string) => {
    try {
      await sendOTP(email);
    } catch (error) {
      throw error;
    }
  };

  const handleVerifyOTP = async (email: string, token: string) => {
    try {
      const session = await onVerifyOTP(email, token);
      setUser(session.user);
      router.push("/");
    } catch (error) {
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      // Still clear local state even if Supabase signout fails
      setUser(null);
      router.push("/auth/sign-in");
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    sendOTP: handleSendOTP,
    verifyOTP: handleVerifyOTP,
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
