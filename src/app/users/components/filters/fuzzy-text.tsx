import { cn } from "@/lib/utils";

export const FuzzyText = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (str: string) => void;
}) => {
  return (
    <input
      type="text"
      placeholder={"Busca por nombre, email o DNI"}
      className={cn(
        "max-w-1/2 w-full rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition focus:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-gray-dark dark:focus:border-primary dark:disabled:bg-dark",
        "px-5.5 py-3 text-dark placeholder:text-dark-6 dark:text-white",
      )}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
