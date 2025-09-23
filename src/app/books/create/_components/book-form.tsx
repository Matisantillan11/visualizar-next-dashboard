"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import FormMultiSelect from "@/components/FormElements/form-multi-select";
import { Author } from "@/types/author";
import { Course } from "@/types/course";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createBook } from "../action";
import { fetcher } from "@/lib/fetcher";

interface CreateBookFormData {
  name: string;
  description: string;
  imageUrl: string;
  releaseDate: string;
  authorId: string;
  courseIds: string[];
}

export default function BookForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingData, setLoadingData] = useState(true);
  const [formData, setFormData] = useState<CreateBookFormData>({
    name: "",
    description: "",
    imageUrl: "",
    releaseDate: "",
    authorId: "",
    courseIds: [],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch authors and courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [authorsData, coursesData] = await Promise.all([
          fetcher({ url: "/authors" }),
          fetcher({ url: "/courses" }),
        ]);

        if ((authorsData as Author[]).length > 0) {
          setAuthors(authorsData as Author[]);
        } else {
          console.error("Failed to fetch authors");
        }

        if ((coursesData as Course[]).length > 0) {
          setCourses(coursesData as Course[]);
        } else {
          console.error("Failed to fetch courses");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchData();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Book name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Book name must be at least 2 characters";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }

    if (!formData.releaseDate) {
      newErrors.releaseDate = "Release date is required";
    }

    if (!formData.authorId) {
      newErrors.authorId = "Author is required";
    }

    if (formData.courseIds.length === 0) {
      newErrors.courseIds = "At least one course is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleServerActionSubmit = async (formDataObj: FormData) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createBook(formDataObj);

      if (result.success) {
        console.log("Book created successfully:", result.data);
        router.push("/books");
      } else {
        setErrors({ submit: result.error || "Failed to create book" });
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

  const handleCourseSelectionChange = (selectedCourseIds: string[]) => {
    setFormData((prev) => ({
      ...prev,
      courseIds: selectedCourseIds,
    }));

    // Clear error when user makes selection
    if (errors.courseIds) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.courseIds;
        return newErrors;
      });
    }
  };

  console.log({ authors });
  const authorOptions = authors
    ? authors.map((author) => ({
        value: author.id,
        label: author.name,
      }))
    : [];

  const courseOptions = courses
    ? courses.map((course) => ({
        value: course.id,
        label: course.name,
      }))
    : [];

  return (
    <form action={handleServerActionSubmit} className="p-6.5">
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
          name="imageUrl"
          label="Image URL"
          type="url"
          placeholder="Enter image URL (e.g., https://example.com/image.jpg)"
          required
          value={formData.imageUrl}
          onChange={handleInputChange("imageUrl")}
          error={errors.imageUrl}
        />
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
          placeholder={loadingData ? "Loading authors..." : "Select author"}
          required
          disabled={loadingData}
          value={formData.authorId}
          onChange={handleInputChange("authorId")}
          error={errors.authorId}
        />
      </div>

      <div className="mb-6">
        <FormMultiSelect
          name="courseIds"
          label="Courses"
          items={courseOptions}
          placeholder={loadingData ? "Loading courses..." : "Select courses"}
          required
          selectedValues={formData.courseIds}
          onSelectionChange={handleCourseSelectionChange}
          error={errors.courseIds}
        />
        {/* Hidden inputs for form submission */}
        {formData.courseIds.map((courseId, index) => (
          <input
            key={courseId}
            type="hidden"
            name={`courseIds[${index}]`}
            value={courseId}
          />
        ))}
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
