"use client";

import FormInput from "@/components/FormElements/form-input";
import { Author } from "@/lib/react-query/authors/author.types";
import {
  useCreateAuthor,
  useUpdateAuthor,
} from "@/lib/react-query/authors/authors.mutations";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  const [formData, setFormData] = useState<CreateAuthorFormData>({
    name: author?.name ?? "",
    biography: author?.biography ?? "",
  });

  const { mutate, isPending, isSuccess, isError, error } = useCreateAuthor();
  const { mutate: updateAuthor, isPending: isUpdatingAuthor } =
    useUpdateAuthor();

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault(); // Prevent default form submission

      try {
        if (authorId) {
          await updateAuthor({
            id: authorId,
            name: formData.name,
            biography: formData.biography,
          });
        } else {
          await mutate({ name: formData.name, biography: formData.biography });
        }
      } catch (error) {
        console.error("Error creating author:", error);
      } finally {
      }
    },
    [mutate, formData],
  );

  const handleInputChange =
    (field: keyof CreateAuthorFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        biography: "",
      });
    }
  }, [isSuccess]);

  return (
    <form onSubmit={handleSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Nombre del Autor"
          type="text"
          placeholder="Ingrese el nombre del autor"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
        />
      </div>

      <div className="mb-4.5">
        <label className="text-body-sm font-medium text-dark dark:text-white">
          Biografía
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <div className="relative mt-3">
          <textarea
            name="biography"
            placeholder="Ingrese la biografía del autor"
            rows={4}
            required
            value={formData.biography}
            onChange={handleInputChange("biography")}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
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
  );
}
