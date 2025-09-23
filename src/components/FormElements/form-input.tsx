"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type HTMLInputTypeAttribute, useId } from "react";

type FormInputProps = {
  className?: string;
  label: string;
  placeholder: string;
  type: HTMLInputTypeAttribute;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  name?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  height?: "sm" | "default";
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      className,
      label,
      type,
      placeholder,
      required,
      disabled,
      error,
      icon,
      iconPosition = "right",
      height,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={className}>
        <label
          htmlFor={id}
          className="text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>

        <div
          className={cn(
            "relative mt-3 [&_svg]:absolute [&_svg]:top-1/2 [&_svg]:-translate-y-1/2",
            iconPosition === "left" ? "[&_svg]:left-4.5" : "[&_svg]:right-4.5",
          )}
        >
          <input
            id={id}
            ref={ref}
            type={type}
            placeholder={placeholder}
            className={cn(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary dark:disabled:bg-dark",
              "px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white",
              iconPosition === "left" && "pl-12.5",
              height === "sm" && "py-2.5",
              error && "border-red focus:border-red",
            )}
            required={required}
            disabled={disabled}
            {...props}
          />

          {icon}
        </div>

        {error && <p className="mt-1 text-sm text-red">{error}</p>}
      </div>
    );
  },
);

FormInput.displayName = "FormInput";

export default FormInput;
