import SigninWithPassword from "@/components/Auth/SigninWithPassword";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignIn() {
  return (
    <div className="w-full xl:w-1/2">
      <div className="w-full p-4 sm:p-12.5 xl:p-15">
        <h2 className="sm:text-title-xl2 mb-9 text-2xl font-bold text-black dark:text-white">
          Sign In
        </h2>
        <SigninWithPassword />
      </div>
    </div>
  );
}
