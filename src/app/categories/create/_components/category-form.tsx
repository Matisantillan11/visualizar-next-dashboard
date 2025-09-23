"use client";

import FormInput from "@/components/FormElements/form-input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createCategory } from "../action";

interface CreateCategoryFormData {
  name: string;
}

export default function CategoryForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateCategoryFormData>({
    name: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Category name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Category name must be at least 2 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServerActionSubmit = async (formDataObj: FormData) => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await createCategory(formDataObj);

      if (result.success) {
        console.log("Category created successfully:", result.data);
        router.push("/categories");
      } else {
        setErrors({ submit: result.error || "Failed to create category" });
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setErrors({ submit: "Failed to create category. Please try again." });
    } finally {
      setIsLoading(false);
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

      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    };

  return (
    <form action={handleServerActionSubmit} className="p-6.5">
      <div className="mb-6">
        <FormInput
          name="name"
          label="Category Name"
          type="text"
          placeholder="Enter category name"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
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
            "Create Category"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/categories")}
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
