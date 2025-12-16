"use client";

import Dropzone from "@/components/ui/dropzone";
import FormInput from "@/components/ui/form-input";
import FormSelect from "@/components/ui/form-select";
import { toast } from "@/components/ui/toast";
import { useAuthors } from "@/lib/react-query/authors";
import {
  Book,
  CreateBookInput,
  useCreateBook,
  useUpdateBook,
} from "@/lib/react-query/books";
import { useCategories } from "@/lib/react-query/categories";
import { useCourses } from "@/lib/react-query/courses";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AnimationsForm } from "./animations/animations-form";

interface CreateBookFormData {
  name: string;
  description: string;
  imageUrl: string;
  authorId: string;
  courseId: string;
  categoryId: string;
  animations: {
    animationName: string;
    animationUrls: string[];
  }[];
}

export default function BookForm({
  requestId,
  bookId,
  book,
}: {
  requestId?: string;
  bookId?: string;
  book?: Book | Partial<Book>;
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
    authorId: book?.authorId
      ? book?.authorId
      : (book?.bookAuthor?.[0]?.authorId ?? ""),
    courseId: requestId
      ? (book?.courseIds?.[0] ?? "")
      : (book?.bookCourse?.[0]?.courseId ?? ""),
    categoryId: book?.bookCategory?.[0]?.categoryId ?? "",
    animations: [
      {
        animationName: "",
        animationUrls: [""],
      },
    ],
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

    try {
      if (!bookId) {
        const reducedAnimations = formData.animations.reduce(
          (acc: string[], animation) => {
            if (animation?.animationUrls?.length > 0) {
              animation.animationUrls.forEach((url) => {
                acc.push(url);
              });
            }

            return acc;
          },
          [],
        );

        // Prepare book data
        const bookData: CreateBookInput = {
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
          authorId: formData.authorId,
          courseId: formData.courseId,
          categoryId: formData.categoryId,
          animations: reducedAnimations,
          bookRequestId: requestId,
        };

        await createBookMutation.mutateAsync(bookData, {
          onSuccess: () => {
            toast.success("Libro creado exitosamente!");
          },
          onError: () =>
            toast.error(
              '"Ooops! Hubo un error al crear tu libro. Intenta de nuevo más tarde',
            ),
        });
      } else {
        const reducedAnimations = formData.animations.reduce(
          (acc: string[], animation) => {
            if (animation?.animationUrls?.length > 0) {
              animation.animationUrls.forEach((url) => {
                acc.push(url);
              });
            }

            return acc;
          },
          [],
        );

        await updateBookMutation(
          {
            id: bookId,
            ...formData,
            animations: reducedAnimations,
          },
          {
            onSuccess: () => {
              toast.success("Libro actualizado exitosamente!");
            },
            onError: () =>
              toast.error(
                '"Ooops! Hubo un error al actulizar tu libro. Intenta de nuevo más tarde',
              ),
          },
        );
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

  const handleUploadComplete = (url: string) => {
    setFormData((prev) => ({
      ...prev,
      imageUrl: url,
    }));
  };

  const handleImageRemoval = (url: string) => {
    if (formData.imageUrl === url) {
      setFormData((prev) => ({
        ...prev,
        imageUrl: "",
      }));
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
          alt={book.name ? book.name : "book-image"}
          width={200}
          height={200}
          className="my-4 rounded-xl"
        />
      ) : (
        <div className="mb-6">
          <Dropzone
            folder={`books/${requestId}`}
            onUploadComplete={handleUploadComplete}
            onFileRemoved={handleImageRemoval}
            maxFiles={1}
            allowedFileTypes={["image/*"]}
            label="Portada del libro"
            required
          />
        </div>
      )}

      {bookId && book ? null : (
        <AnimationsForm
          label="Animaciones"
          requestId={requestId}
          required
          animations={formData.animations}
          setAnimations={(animations) =>
            setFormData((prev) => ({ ...prev, animations }))
          }
        />
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
