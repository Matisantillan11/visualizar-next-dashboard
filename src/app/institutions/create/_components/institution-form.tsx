"use client";

import { InputFormField } from "@/components/ui/form/input-form-field";
import { toast } from "@/components/ui/toast";
import { useCreateInstitution } from "@/lib/react-query/institutions";
import { useUpdateInstitution } from "@/lib/react-query/institutions/institutions.mutations";
import { Institution } from "@/lib/react-query/institutions/institutions.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { insitutionSchema } from "./form-schema";
interface CreateInstitutionFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function InstitutionForm({
  institutionId,
  institution,
}: {
  institutionId?: string;
  institution?: Institution;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    values: {
      name: institution?.name ?? "",
      address: institution?.address ?? "",
      phone: institution?.phone ?? "",
      email: institution?.email ?? "",
    },
    resolver: zodResolver(insitutionSchema),
  });

  const { mutateAsync: createInstitution, isPending } = useCreateInstitution();

  const { mutateAsync: updateInstitution, isPending: isUpdatePending } =
    useUpdateInstitution();

  const handleSubmit = async (data: CreateInstitutionFormData) => {
    try {
      if (institutionId) {
        await updateInstitution(
          {
            id: institutionId,
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
          },
          {
            onSuccess: () => {
              toast.success("Institución creada exitosamente!");
              form.reset({
                address: "",
                email: "",
                name: "",
                phone: "",
              });
            },
            onError: () =>
              toast.error(
                '"Ooops! Hubo un error al crear tu institución. Intenta de nuevo más tarde',
              ),
          },
        );
      } else {
        await createInstitution(
          {
            name: data.name,
            address: data.address,
            phone: data.phone,
            email: data.email,
          },
          {
            onSuccess: () => {
              toast.success("Institución actualizada exitosamente!");
              form.reset();
            },
            onError: () =>
              toast.error(
                '"Ooops! Hubo un error al actualizar tu institución. Intenta de nuevo más tarde',
              ),
          },
        );
      }
    } catch (error) {
      console.error("Error creating institution:", error);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6.5">
        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="name"
            label="Nombre de la Institución"
            type="text"
            placeholder="Ingrese el nombre de la institución"
            required
          />
        </div>

        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="address"
            label="Dirección"
            type="text"
            placeholder="Ingrese la dirección de la institución"
            required
          />
        </div>

        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="phone"
            label="Número de Teléfono"
            type="tel"
            placeholder="Ingrese el número de teléfono"
            required
          />
        </div>

        <div className="mb-6">
          <InputFormField
            form={form}
            name="email"
            label="Dirección de Email"
            type="email"
            placeholder="Ingrese la dirección de email"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending || isUpdatePending}
            className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending || isUpdatePending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {institutionId ? "Actualizando..." : "Creando..."}
              </div>
            ) : institutionId ? (
              "Actualizar Institución"
            ) : (
              "Crear Institución"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/institutions")}
            disabled={isPending}
            className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
