import { ChevronUpIcon } from "@/assets/icons";
import { Role } from "@/lib/react-query/users/users.types";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

Role;

const items = [
  { value: Role.ADMIN, label: "Administrador" },
  { value: Role.STUDENT, label: "Estudiante" },
  { value: Role.TEACHER, label: "Profesor" },
];

export const FilterSelect = ({
  selectedRole,
  onSelectRole,
}: {
  selectedRole?: string;
  onSelectRole: (role?: string) => void;
}) => {
  const onSelect = (role: string) => {
    if (role === "CLEAR") {
      onSelectRole(undefined);
      return;
    }

    onSelectRole(role);
  };

  const options = useMemo(() => {
    if (selectedRole !== undefined) {
      const newOptions = [
        ...items,
        { value: "CLEAR", label: "Limpiar filtro " },
      ];
      return newOptions;
    }

    return items;
  }, [selectedRole]);

  return (
    <div className="relative w-64">
      <select
        className={cn(
          "w-full appearance-none rounded-lg border border-stroke bg-transparent px-5.5 py-3 outline-none transition focus:border-primary active:border-primary dark:border-dark-3 dark:bg-gray-dark dark:focus:border-primary [&>option]:text-dark-5 dark:[&>option]:text-dark-6",
          "text-dark dark:text-white",
        )}
        value={selectedRole}
        onChange={(e) => onSelect(e.target.value)}
      >
        {!selectedRole && <option value="">Seleccionar rol</option>}

        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <ChevronUpIcon className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 rotate-180" />
    </div>
  );
};
