import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const DangerButton = ({
  children,
  ...props
}: DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { children: React.ReactNode }) => {
  return (
    <button
      {...props}
      className={cn(
        "text inline-flex max-h-10 items-center justify-center rounded-lg border-none bg-red-500 px-6 py-3 text-center font-medium text-white hover:bg-red-600",
      )}
    >
      {children}
    </button>
  );
};
