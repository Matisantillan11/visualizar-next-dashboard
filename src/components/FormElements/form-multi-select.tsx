"use client";

import { ChevronUpIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { forwardRef, useId, useState, useEffect, useRef } from "react";

type FormMultiSelectProps = {
  label: string;
  items: { value: string; label: string }[];
  className?: string;
  error?: string;
  required?: boolean;
  placeholder?: string;
  selectedValues?: string[];
  onSelectionChange?: (selectedValues: string[]) => void;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

const FormMultiSelect = forwardRef<HTMLSelectElement, FormMultiSelectProps>(
  (
    {
      items,
      label,
      className,
      error,
      required,
      placeholder,
      selectedValues = [],
      onSelectionChange,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    const handleItemToggle = (value: string) => {
      const newSelection = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];

      onSelectionChange?.(newSelection);
    };

    const getSelectedLabels = () => {
      if (selectedValues.length === 0) {
        return placeholder || "Select options";
      }
      if (selectedValues.length === 1) {
        const item = items.find((item) => item.value === selectedValues[0]);
        return item?.label || "";
      }
      return `${selectedValues.length} selected`;
    };

    return (
      <div className={cn("space-y-3", className)}>
        <label
          htmlFor={id}
          className="block text-body-sm font-medium text-dark dark:text-white"
        >
          {label}
          {required && <span className="ml-1 select-none text-red">*</span>}
        </label>

        <div className="relative" ref={dropdownRef}>
          <div
            className={cn(
              "w-full cursor-pointer rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-dark-2 dark:focus:border-primary",
              "text-dark dark:text-white",
              error && "border-red focus:border-red",
              "flex items-center justify-between",
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={cn(
                selectedValues.length === 0 && "text-dark-6 dark:text-dark-6",
              )}
            >
              {getSelectedLabels()}
            </span>
            <ChevronUpIcon
              className={cn(
                "transition-transform",
                isOpen ? "rotate-0" : "rotate-180",
              )}
            />
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-1 w-full rounded-lg border border-stroke bg-white shadow-lg dark:border-dark-3 dark:bg-dark-2">
              <div className="max-h-60 overflow-y-auto p-2">
                {items.map((item) => (
                  <div
                    key={item.value}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded px-3 py-2 transition hover:bg-gray-1 dark:hover:bg-dark-3",
                      selectedValues.includes(item.value) &&
                        "bg-primary/10 text-primary dark:bg-primary/20",
                    )}
                    onClick={() => handleItemToggle(item.value)}
                  >
                    <input
                      type="checkbox"
                      checked={selectedValues.includes(item.value)}
                      onChange={() => {}} // Handled by parent div onClick
                      className="rounded border-stroke text-primary focus:ring-primary dark:border-dark-3"
                    />
                    <span className="text-dark dark:text-white">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hidden select for form submission */}
          <select
            ref={ref}
            multiple
            value={selectedValues}
            onChange={() => {}} // Controlled by our custom logic
            className="sr-only"
            {...props}
          >
            {items.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="mt-1 text-sm text-red">{error}</p>}
      </div>
    );
  },
);

FormMultiSelect.displayName = "FormMultiSelect";

export default FormMultiSelect;
