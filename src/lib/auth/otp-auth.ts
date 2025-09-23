import { fetcher } from "../fetcher";
import type { AuthUser, AuthSession, AuthResponse } from "./types";

/**
 * OTP-based authentication functions
 * Simple API endpoints for sending and verifying OTP codes
 */

export const sendOTP = async (email: string): Promise<void> => {
  try {
    await fetcher({
      url: "/auth/send-otp",
      init: {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      withAuthentication: false, // No auth needed for sending OTP
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw new Error("Failed to send OTP code. Please try again.");
  }
};

export const verifyOTP = async (
  email: string,
  token: string,
): Promise<AuthSession | undefined> => {
  try {
    const response = await fetcher<AuthResponse>({
      url: "/auth/verify-otp",
      init: {
        method: "POST",
        body: JSON.stringify({
          email,
          token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      },
      withAuthentication: false, // No auth needed for verification
    });

    if (response && response.access_token && response.user) {
      const authUser: AuthUser = {
        id: response.user.id,
        name: response.user.name ?? "",
        role: response.user.role,
        email: response.user.email,
      };

      const authSession: AuthSession = {
        user: authUser,
        token: response.access_token, // Main token from API
        accessToken: response.access_token, // Same token for both fields
        expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days from now
      };

      return authSession;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw new Error("Invalid OTP code. Please try again.");
  }
};
