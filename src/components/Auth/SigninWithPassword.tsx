"use client";
import { EmailIcon } from "@/assets/icons";
import { useAuth } from "@/contexts/auth-context";
import React, { useState } from "react";
import InputGroup from "../FormElements/InputGroup";
import OTPVerification from "./OTPVerification";

export default function SigninWithPassword() {
  const { sendOTP } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showOTP, setShowOTP] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await sendOTP(email);
      setShowOTP(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to send verification code",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowOTP(false);
    setError(null);
  };

  if (showOTP) {
    return <OTPVerification email={email} onBack={handleBackToEmail} />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="sm:text-title-xl2 mb-2 text-2xl font-bold text-black dark:text-white">
          Sign In
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Enter your email to receive a verification code
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <InputGroup
        type="email"
        label="Email"
        className="mb-6 [&_input]:py-[15px]"
        placeholder="Enter your email address"
        name="email"
        handleChange={handleChange}
        value={email}
        icon={<EmailIcon />}
        required
      />

      <div className="mb-4">
        <button
          type="submit"
          disabled={loading || !email.trim()}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send Verification Code
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
          )}
        </button>
      </div>

      <div className="text-center text-sm text-gray-600 dark:text-gray-400">
        <p>We'll send you a secure 6-digit code to verify your identity.</p>
      </div>
    </form>
  );
}
