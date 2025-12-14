"use client";

import { InputFormField } from "@/components/ui/form/input-form-field";
import { InputFormSelect } from "@/components/ui/form/input-form-select";
import { useUpdateUser } from "@/lib/react-query/users/users.mutations";
import { Role, User } from "@/lib/react-query/users/users.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { userSchema } from "./form-schema";

interface CreateUserFormData {
  name: string;
  email: string;
  dni: string;
  role: Role;
}

export default function UserForm({
  userId,
  user,
}: {
  userId?: string;
  user?: User;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      dni: "",
      role: "" as Role,
    },
    values: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      dni: user?.dni ?? "",
      role: user?.role ?? ("" as Role),
    },
    resolver: zodResolver(userSchema),
  });

  const { mutateAsync: updateUser, isPending: isUpdating } = useUpdateUser();

  const roleOptions = [
    { value: Role.ADMIN, label: "Administrador" },
    { value: Role.TEACHER, label: "Profesor" },
    { value: Role.STUDENT, label: "Estudiante" },
  ];

  const handleSubmit = async (data: CreateUserFormData) => {
    try {
      if (!userId) {
        /* await createUser(data); */
      } else {
        await updateUser({ id: user?.id, ...data });
      }
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Using Server Actions (recommended)
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6.5">
        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="name"
            label="Nombre Completo"
            type="text"
            placeholder="Ingrese el nombre completo"
            required
          />
        </div>

        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="email"
            label="Dirección de Email"
            type="email"
            placeholder="Ingrese la dirección de email"
            required
          />
        </div>

        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="dni"
            label="DNI"
            type="text"
            placeholder="Ingrese el número de DNI"
            required
          />
        </div>

        <div className="mb-6">
          <InputFormSelect
            form={form}
            name="role"
            label="Rol"
            items={roleOptions}
            placeholder="Seleccione el rol del usuario"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isLoading || isUpdating}
            className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading || isUpdating ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {userId ? "Actualizando..." : "Creando..."}
              </div>
            ) : userId ? (
              "Actualizar Usuario"
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
    </FormProvider>
  );
}
