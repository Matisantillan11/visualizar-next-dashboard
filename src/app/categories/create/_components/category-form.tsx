"use client";

import { InputFormField } from "@/components/ui/form/input-form-field";
import { useCreateCategory } from "@/lib/react-query/categories";
import { useUpdateCategory } from "@/lib/react-query/categories/categories.mutations";
import { Category } from "@/lib/react-query/categories/categories.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { categoryFormSchema } from "./form.schema";

interface CreateCategoryFormData {
  name: string;
}

export default function CategoryForm({
  categoryId,
  category,
}: {
  categoryId?: string;
  category?: Category;
}) {
  const router = useRouter();
  const form = useForm<CreateCategoryFormData>({
    defaultValues: {
      name: "",
    },
    values: {
      name: category?.name ?? "",
    },
    resolver: zodResolver(categoryFormSchema),
  });

  const { mutate: createCategory, isPending, isSuccess } = useCreateCategory();
  const { mutate: updateCategory, isPending: isUpdatingBook } =
    useUpdateCategory();

  const onSubmit = async (data: CreateCategoryFormData) => {
    try {
      if (categoryId) {
        await updateCategory({
          id: categoryId,
          name: data.name,
        });
      } else {
        await createCategory({
          name: data.name,
        });
      }
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      form.reset();
    }
  }, [isSuccess]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-6.5">
        <div className="mb-6">
          <InputFormField
            name="name"
            form={form}
            label="Nombre de la Categoría"
            type="text"
            placeholder="Ingrese el nombre de la categoría"
            required
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isPending || isUpdatingBook}
            className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isPending || isUpdatingBook ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                {categoryId ? "Actualizando..." : "Creando..."}
              </div>
            ) : categoryId ? (
              "Actualizar Categoría"
            ) : (
              "Crear Categoría"
            )}
          </button>

          <button
            type="button"
            onClick={() => router.push("/categories")}
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
