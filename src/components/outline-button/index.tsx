import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export const OutlineButton = ({
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
        "text inline-flex max-h-10 items-center justify-center rounded-lg border border-primary px-6 py-3 text-center font-medium text-primary hover:bg-primary/80 hover:text-white",
      )}
    >
      {children}
    </button>
  );
};
