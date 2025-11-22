"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import { storeFile } from "@/lib/storage";
import { Author } from "@/types/author";
import { Category } from "@/types/category";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBook } from "../action";

interface CreateBookFormData {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  authorId: string;
  courseId: string;
  categoryId: string;
  animationFolderName: string;
}
const BUCKET = "visualizar-attachments";

export default function BookForm({
  authors,
  courses,
  categories,
}: {
  authors: Author[];
  courses: Course[];
  categories: Category[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBookFormData>({
    name: "",
    description: "",
    imageUrl: "",
    releaseDate: "",
    authorId: "",
    courseId: "",
    categoryId: "",
    animationFolderName: "",
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
    console.log({ formDataObj });
    setIsLoading(true);

    try {
      // Get the file from the form data
      const fileInput = document.querySelector(
        'input[name="file"]',
      ) as HTMLInputElement;
      const file = fileInput.files?.[0];
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
        const imageUrl = await storeFile(file, BUCKET, path);
        if (imageUrl) {
          formDataObj.set("imageUrl", imageUrl);
          formDataObj.set("animationFolderName", `books/${folder}`);
        }
        console.log({ formDataObj });
        const result = await createBook(formDataObj);

        if (result.success) {
          console.log("Book created successfully:", result.data);
          router.push("/books");
        } else {
          setErrors({ submit: result.error || "Failed to create book" });
        }
      }
    } catch (error) {
      console.error("Error creating book:", error);
      setErrors({ submit: "Failed to create book. Please try again." });
    } finally {
      setIsLoading(false);
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

  console.log({ authors });
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
          label="Book Title"
          type="text"
          placeholder="Enter book title"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
        />
      </div>

      <div className="mb-4.5">
        <label className="text-body-sm font-medium text-dark dark:text-white">
          Description
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <div className="relative mt-3">
          <textarea
            name="description"
            placeholder="Enter book description"
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
        <FormInput
          name="releaseDate"
          label="Release Date"
          type="date"
          placeholder=""
          required
          value={formData.releaseDate}
          onChange={handleInputChange("releaseDate")}
          error={errors.releaseDate}
        />
      </div>

      <div className="mb-4.5">
        <FormSelect
          name="authorId"
          label="Author"
          items={authorOptions}
          placeholder={
            authors.length === 0 ? "Loading authors..." : "Select author"
          }
          required
          disabled={authors.length === 0}
          value={formData.authorId}
          onChange={handleInputChange("authorId")}
          error={errors.authorId}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="categoryId"
          label="Genres"
          items={categoryOptions}
          placeholder={
            categories.length === 0
              ? "Loading categories..."
              : "Select categories"
          }
          required
          value={formData.categoryId}
          onChange={handleInputChange("categoryId")}
          error={errors.categoryId}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="courseId"
          label="Courses"
          items={courseOptions}
          placeholder={
            courses.length === 0 ? "Loading courses..." : "Select courses"
          }
          required
          value={formData.courseId}
          onChange={handleInputChange("courseId")}
          error={errors.courseId}
        />
      </div>

      <div className="mb-6">
        <label className="text-body-sm font-medium text-dark dark:text-white">
          Upload Image
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <input
          type="file"
          name="file"
          accept="image/*"
          className="mt-3 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-opacity-90"
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
              Creating...
            </div>
          ) : (
            "Create Book"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/books")}
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
