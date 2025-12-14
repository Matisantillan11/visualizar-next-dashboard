import FormInput, { FormInputProps } from "@/components/ui/form-input";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

export const InputFormField = <TFieldValues extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  required,
  disabled,
  icon,
  iconPosition,
  height,
  form,
}: Omit<FormInputProps, "error" | "name" | "form"> & {
  form: UseFormReturn<TFieldValues>;
  name: Path<TFieldValues>;
}) => {
  console.log({ form });
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, fieldState }) => (
        <FormInput
          {...field}
          label={label}
          placeholder={placeholder}
          type={type}
          required={required}
          disabled={disabled}
          error={fieldState.error?.message}
          icon={icon}
          iconPosition={iconPosition}
          height={height}
        />
      )}
    />
  );
};
