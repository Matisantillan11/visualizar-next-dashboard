import FormSelect, {
  FormSelectProps,
} from "@/components/FormElements/form-select";
import { Controller, FieldValues, Path, UseFormReturn } from "react-hook-form";

export const InputFormSelect = <TFieldValues extends FieldValues>({
  name,
  form,
  label,
  items,
  placeholder,
  required,
  disabled,
}: Omit<FormSelectProps, "name" | "form"> & {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
}) => {
  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormSelect
          {...field}
          label={label}
          items={items}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      )}
    />
  );
};
