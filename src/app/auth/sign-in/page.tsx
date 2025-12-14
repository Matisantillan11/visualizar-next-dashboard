import SigninWithPassword from "@/components/auth/SigninWithPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="w-full xl:w-1/2">
      <div className="w-full p-4 sm:p-12.5 xl:p-15">
        <SigninWithPassword />
      </div>
    </div>
  );
}
