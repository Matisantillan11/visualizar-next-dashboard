"use client";

import { InputFormField } from "@/components/ui/form/input-form-field";
import { InputTextArea } from "@/components/ui/form/input-text-area";
import { toast } from "@/components/ui/toast";
import { Author } from "@/lib/react-query/authors/author.types";
import {
  useCreateAuthor,
  useUpdateAuthor,
} from "@/lib/react-query/authors/authors.mutations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { authorFormSchema } from "./form-schema";

interface CreateAuthorFormData {
  name: string;
  biography: string;
}

export default function AuthorForm({
  authorId,
  author,
}: {
  authorId?: string;
  author?: Author;
}) {
  const router = useRouter();

  const form = useForm<CreateAuthorFormData>({
    defaultValues: {
      name: "",
      biography: "",
    },
    values: {
      name: author?.name ?? "",
      biography: author?.biography ?? "",
    },
    resolver: zodResolver(authorFormSchema),
  });

  const { mutate, isPending, isError, error } = useCreateAuthor();
  const { mutate: updateAuthor, isPending: isUpdatingAuthor } =
    useUpdateAuthor();

  const handleSubmit = async (data: CreateAuthorFormData) => {
    try {
      if (authorId) {
        await updateAuthor(
          {
            id: authorId,
            name: data.name,
            biography: data.biography,
          },
          {
            onSuccess: () => {
              toast.success("Autor creado exitosamente!");
              form.reset({
                biography: "",
                name: "",
              });
            },
            onError: () =>
              toast.error(
                '"Ooops! Hubo un error al crear tu autor. Intenta de nuevo más tarde',
              ),
          },
        );
      } else {
        await mutate(
          { name: data.name, biography: data.biography },
          {
            onSuccess: () => {
              toast.success("Autor actualizado exitosamente!");
              form.reset();
            },
            onError: () =>
              toast.error(
                '"Ooops! Hubo un error al actulizar tu autor. Intenta de nuevo más tarde',
              ),
          },
        );
      }
    } catch (error) {
      console.error("Error creating author:", error);
    } finally {
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6.5">
        <div className="mb-4.5">
          <InputFormField
            form={form}
            name="name"
            label="Nombre del Autor"
            type="text"
            placeholder="Ingrese el nombre del autor"
            required
          />
        </div>

        <div className="mb-4.5">
          <label className="text-body-sm font-medium text-dark dark:text-white">
            Biografía
            <span className="ml-1 select-none text-red">*</span>
          </label>
          <div className="relative mt-3">
            <InputTextArea
              name="biography"
              placeholder="Ingrese la biografía del autor"
              rows={4}
              required
              form={form}
            />
          </div>
        </div>

        {isError && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
            {error.message}
          </div>
        )}

        <div className="flex gap-4">
          <button
            className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            type="submit"
            disabled={isPending || isUpdatingAuthor}
          >
            {isPending || isUpdatingAuthor ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {authorId ? "Actualizando..." : "Creando..."}
              </div>
            ) : authorId ? (
              "Actualizar Autor"
            ) : (
              "Crear Autor"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/authors")}
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
