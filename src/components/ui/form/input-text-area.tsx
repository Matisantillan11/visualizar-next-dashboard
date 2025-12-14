import { cn } from "@/lib/utils";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

export const InputTextArea = <TFieldValues extends FieldValues>({
  name,
  form,
  ...props
}: {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
} & Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "name" | "form"
>) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <div>
          <textarea
            {...field}
            {...props}
            className={cn(
              "w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary",
              fieldState.error && "border-red focus:border-red",
            )}
          />
          {fieldState.error && (
            <p className="mt-1 text-sm text-red">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};
