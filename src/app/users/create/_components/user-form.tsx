"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import { Role } from "@/lib/react-query/users/users.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "../action";

interface CreateUserFormData {
  name: string;
  email: string;
  dni: string;
  role: Role;
}

export default function UserForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateUserFormData>({
    name: "",
    email: "",
    dni: "",
    role: "" as Role,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = [
    { value: Role.ADMIN, label: "Administrador" },
    { value: Role.TEACHER, label: "Profesor" },
    { value: Role.STUDENT, label: "Estudiante" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor ingrese un email válido";
    }

    if (!formData.dni.trim()) {
      newErrors.dni = "El DNI es requerido";
    } else if (!/^\d{7,8}$/.test(formData.dni.trim())) {
      newErrors.dni = "El DNI debe tener 7 u 8 dígitos";
    }

    if (!formData.role) {
      newErrors.role = "El rol es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServerActionSubmit = async (formDataObj: FormData) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createUser(formDataObj);
      if (result.data.user) {
        console.log("User created successfully:", result.data.user);
        router.push("/users");
      } else {
        setErrors({ submit: result.error || "Error al crear el usuario" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors({
        submit: "Error al crear el usuario. Por favor intente nuevamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof CreateUserFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  // Using Server Actions (recommended)
  return (
    <form action={handleServerActionSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Nombre Completo"
          type="text"
          placeholder="Ingrese el nombre completo"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="email"
          label="Dirección de Email"
          type="email"
          placeholder="Ingrese la dirección de email"
          required
          value={formData.email}
          onChange={handleInputChange("email")}
          error={errors.email}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="dni"
          label="DNI"
          type="text"
          placeholder="Ingrese el número de DNI"
          required
          value={formData.dni}
          onChange={handleInputChange("dni")}
          error={errors.dni}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="role"
          label="Rol"
          items={roleOptions}
          placeholder="Seleccione el rol del usuario"
          required
          value={formData.role}
          onChange={handleInputChange("role")}
          error={errors.role}
        />
      </div>

      {errors.submit && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {errors.submit}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Creando...
            </div>
          ) : (
            "Crear Usuario"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/users")}
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  );

  // Alternative: Using API Routes (uncomment to use this approach instead)
  /*
  return (
    <form onSubmit={handleApiSubmit} className="p-6.5">
      // ... same form fields as above ...
    </form>
  );
  */
}
