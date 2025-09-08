"use client";
import { useAuth } from "@/contexts/auth-context";
import React, { useState, useRef, useEffect } from "react";

interface OTPVerificationProps {
  email: string;
  onBack: () => void;
}

export default function OTPVerification({
  email,
  onBack,
}: OTPVerificationProps) {
  const { verifyOTP } = useAuth();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Clear error when user starts typing
    if (error) setError(null);

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newOtp = [...otp];

    for (let i = 0; i < pastedData.length && i < 6; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newOtp[i] = pastedData[i];
      }
    }

    setOtp(newOtp);

    // Focus the next empty input or the last input
    const nextEmptyIndex = newOtp.findIndex((digit, idx) => idx < 6 && !digit);
    const focusIndex = nextEmptyIndex === -1 ? 5 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      setError("Please enter a complete 6-digit code");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await verifyOTP(email, otpCode);
      // Redirect is handled by the AuthContext
    } catch (err) {
      setError(err instanceof Error ? err.message : "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <h2 className="sm:text-title-xl2 mb-2 text-2xl font-bold text-black dark:text-white">
          Verify Your Email
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          We sent a 6-digit code to <span className="font-medium">{email}</span>
        </p>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
          Enter verification code
        </label>
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(index, e.target.value.replace(/\D/g, ""))
              }
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-12 w-12 rounded-lg border border-stroke bg-transparent text-center text-lg font-medium outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary"
              disabled={loading}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <button
          type="submit"
          disabled={loading || otp.join("").length !== 6}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Verify Code
          {loading && (
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
          )}
        </button>
      </div>

      <div className="text-center">
        <button
          type="button"
          onClick={onBack}
          className="text-primary hover:underline"
          disabled={loading}
        >
          Back to email entry
        </button>
      </div>
    </form>
  );
}
