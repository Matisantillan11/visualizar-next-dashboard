"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { forwardRef, useId } from "react";

export type FormSelectProps = {
  label: string;
  items: { value: string; label: string }[];
  prefixIcon?: React.ReactNode;
  className?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const FormSelect = forwardRef<HTMLSelectElement, FormSelectProps>(
  (
    {
      items,
      label,
      prefixIcon,
      className,
      error,
      required,
      placeholder,
      ...props
    },
    ref,
  ) => {
    const id = useId();

    return (
      <div className={cn("space-y-3", className)}>
        <label
          htmlFor={id}
          className="block text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>

        <div className="relative">
          {prefixIcon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              {prefixIcon}
            </div>
          )}

          <select
            id={id}
            ref={ref}
            className={cn(
              "w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6",
              "text-dark dark:text-white",
              prefixIcon && "pl-11.5",
              error && "border-red focus:border-red",
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}

            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
        </div>

        {error && <p className="mt-1 text-sm text-red">{error}</p>}
      </div>
    );
  },
);

FormSelect.displayName = "FormSelect";

export default FormSelect;
