"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import { useAuthors } from "@/lib/react-query/authors";
import {
  Book,
  CreateBookInput,
  useCreateBook,
  useUpdateBook,
} from "@/lib/react-query/books";
import { useCategories } from "@/lib/react-query/categories";
import { useCourses } from "@/lib/react-query/courses";
import { storeFile } from "@/lib/storage";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface CreateBookFormData {
  name: string;
  description: string;
  imageUrl: string;
  authorId: string;
  courseId: string;
  categoryId: string;
}
const BUCKET = "visualizar-attachments";

export default function BookForm({
  bookId,
  book,
}: {
  bookId?: string;
  book?: Book;
}) {
  const router = useRouter();

  // Fetch data with TanStack Query
  const { data: authors = [], isLoading: authorsLoading } = useAuthors();
  const { data: courses = [], isLoading: coursesLoading } = useCourses();
  const { data: categories = [], isLoading: categoriesLoading } =
    useCategories();

  // Create book mutation
  const createBookMutation = useCreateBook();
  const { mutateAsync: updateBookMutation, isPending: updateBookLoading } =
    useUpdateBook();

  const [formData, setFormData] = useState<CreateBookFormData>({
    name: book?.name ?? "",
    description: book?.description ?? "",
    imageUrl: book?.imageUrl ?? "",
    authorId: book?.bookAuthor?.[0].authorId ?? "",
    courseId: book?.bookCourse?.[0].courseId ?? "",
    categoryId: book?.bookCategory?.[0].categoryId ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function slugify(text: string) {
    return text
      .toString()
      .normalize("NFD") // separa acentos
      .replace(/[\u0300-\u036f]/g, "") // elimina acentos
      .replace(/ñ/g, "n") // reemplaza ñ
      .replace(/[^a-zA-Z0-9-_./]/g, "-") // reemplaza todo lo que no sea válido
      .toLowerCase();
  }

  const handleServerActionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault(); // Prevent default form submission
    const formDataObj = new FormData(event.currentTarget);

    try {
      if (!bookId) {
        // Get the file from the form data
        const fileInput = document.querySelector(
          'input[name="file"]',
        ) as HTMLInputElement;
        const file = fileInput.files?.[0];

        let imageUrl = formData.imageUrl;

        if (file) {
          // Upload the file to Supabase Storage
          const folder = slugify(
            formDataObj
              .get("name")
              ?.toString()
              ?.toLowerCase()
              ?.replace(/ /g, "-") as string,
          );
          const path = `books/${folder}/${file.name}`;
          const uploadedUrl = await storeFile(file, BUCKET, path);
          if (uploadedUrl) {
            imageUrl = uploadedUrl;
          }
        }

        // Prepare book data
        const bookData: CreateBookInput = {
          name: formDataObj.get("name") as string,
          description: formDataObj.get("description") as string,
          imageUrl,
          releaseDate: formDataObj.get("releaseDate") as string,
          authorId: formDataObj.get("authorId") as string,
          courseId: formDataObj.get("courseId") as string,
          categoryId: formDataObj.get("categoryId") as string,
          animations: [""],
          bookRequestId: "0f9e24ee-1487-45fa-8cf8-ccbad73551d9",
        };

        await createBookMutation.mutateAsync(bookData);
      } else {
        await updateBookMutation({
          id: bookId,
          ...formData,
        });
      }

      router.push("/books");
    } catch (error) {
      console.error("Error creating book:", error);
      setErrors({
        submit: "Error al crear el libro. Por favor intente nuevamente.",
      });
    }
  };

  const handleInputChange =
    (field: keyof CreateBookFormData) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
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

  const authorOptions =
    authors.length > 0
      ? authors.map((author) => ({
          value: author.id,
          label: author.name,
        }))
      : [];

  const categoryOptions = categories
    ? categories?.map((category) => ({
        value: category.id,
        label: category.name,
      }))
    : [];

  const courseOptions = courses
    ? courses?.map((course) => ({
        value: course.id,
        label: course.name,
      }))
    : [];

  return (
    <form onSubmit={handleServerActionSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Título del Libro"
          type="text"
          placeholder="Ingrese el título del libro"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
        />
      </div>

      <div className="mb-4.5">
        <label className="text-body-sm font-medium text-dark dark:text-white">
          Descripción
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <div className="relative mt-3">
          <textarea
            name="description"
            placeholder="Ingrese la descripción del libro"
            rows={4}
            required
            value={formData.description}
            onChange={handleInputChange("description")}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        {errors.description && (
          <p className="mt-1 text-sm text-red">{errors.description}</p>
        )}
      </div>

      <div className="mb-4.5">
        <FormSelect
          name="authorId"
          label="Autor"
          items={authorOptions}
          placeholder={
            authors.length === 0 ? "Cargando autores..." : "Seleccione el autor"
          }
          required
          disabled={authors.length === 0 || authorsLoading}
          value={formData.authorId}
          onChange={handleInputChange("authorId")}
          error={errors.authorId}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="categoryId"
          label="Géneros"
          items={categoryOptions}
          placeholder={
            categories.length === 0
              ? "Cargando categorías..."
              : "Seleccione las categorías"
          }
          required
          value={formData.categoryId}
          onChange={handleInputChange("categoryId")}
          error={errors.categoryId}
          disabled={categories.length === 0 || categoriesLoading}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="courseId"
          label="Cursos"
          items={courseOptions}
          placeholder={
            courses.length === 0
              ? "Cargando cursos..."
              : "Seleccione los cursos"
          }
          required
          value={formData.courseId}
          onChange={handleInputChange("courseId")}
          error={errors.courseId}
          disabled={courses.length === 0 || coursesLoading}
        />
      </div>

      {bookId && book ? (
        <Image
          src={formData.imageUrl}
          alt={book.name}
          width={200}
          height={200}
          className="my-4 rounded-xl"
        />
      ) : (
        <div className="mb-6">
          <label className="text-body-sm font-medium text-dark dark:text-white">
            Subir Imagen
            <span className="ml-1 select-none text-red">*</span>
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-opacity-90"
          />
        </div>
      )}

      {errors.submit && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
          {errors.submit}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={createBookMutation.isPending || updateBookLoading}
          className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {createBookMutation.isPending || updateBookLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              {bookId ? "Actualizando..." : "Creando..."}
            </div>
          ) : bookId ? (
            "Actualizar Libro"
          ) : (
            "Crear Libro"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/books")}
          disabled={createBookMutation.isPending}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
