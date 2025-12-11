"use client";

import FormInput from "@/components/FormElements/form-input";
import { useCreateCategory } from "@/lib/react-query/categories";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CreateCategoryFormData {
  name: string;
}

export default function CategoryForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateCategoryFormData>({
    name: "",
  });

  const { mutate: createCategory, isPending, isSuccess } = useCreateCategory();

  const handleSubmit = async () => {
    try {
      await createCategory({
        name: formData.name,
      });
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const handleInputChange =
    (field: keyof CreateCategoryFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
      });
    }
  }, [isSuccess]);

  return (
    <form action={handleSubmit} className="p-6.5">
      <div className="mb-6">
        <FormInput
          name="name"
          label="Nombre de la Categoría"
          type="text"
          placeholder="Ingrese el nombre de la categoría"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Creando...
            </div>
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
  );
}
