"use client";

import FormInput from "@/components/FormElements/form-input";
import { storeFile } from "@/lib/storage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createAuthor } from "../action";

const BUCKET = "visualizar-attachments";

interface CreateAuthorFormData {
  name: string;
  biography: string;
  imageUrl: string;
}

export default function AuthorForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAuthorFormData>({
    name: "",
    biography: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Author name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Author name must be at least 2 characters";
    }

    if (!formData.biography.trim()) {
      newErrors.biography = "Biography is required";
    } else if (formData.biography.trim().length < 10) {
      newErrors.biography = "Biography must be at least 10 characters";
    }

    if (!formData.imageUrl.trim()) {
      newErrors.imageUrl = "Image URL is required";
    } else if (!isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
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

  const handleServerActionSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault(); // Prevent default form submission
    const formDataObj = new FormData(event.currentTarget);

    setIsLoading(true);

    try {
      // Get the file from the form data
      const fileInput = document.querySelector(
        'input[name="file"]',
      ) as HTMLInputElement;
      const file = fileInput.files?.[0];
      if (file) {
        // Upload the file to Supabase Storage
        const path = `authors/${formDataObj.get("name")?.toString()?.toLowerCase()?.replace(/ /g, "-")}/${file.name}`;
        const imageUrl = await storeFile(file, BUCKET, path);
        if (imageUrl) {
          formDataObj.set("imageUrl", imageUrl);
        }
        const result = await createAuthor(formDataObj);

        if (result.success) {
          router.push("/authors");
        } else {
          setErrors({ submit: result.error || "Failed to create author" });
        }
      }
    } catch (error) {
      console.error("Error creating author:", error);
      setErrors({ submit: "Failed to create author. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof CreateAuthorFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <form onSubmit={handleServerActionSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Author Name"
          type="text"
          placeholder="Enter author name"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
        />
      </div>

      <div className="mb-4.5">
        <label className="text-body-sm font-medium text-dark dark:text-white">
          Biography
          <span className="ml-1 select-none text-red">*</span>
        </label>
        <div className="relative mt-3">
          <textarea
            name="biography"
            placeholder="Enter author biography"
            rows={4}
            required
            value={formData.biography}
            onChange={handleInputChange("biography")}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition placeholder:text-dark-6 focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        {errors.biography && (
          <p className="mt-1 text-sm text-red">{errors.biography}</p>
        )}
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
          className="flex w-full justify-center rounded-lg bg-primary p-3 font-medium text-white hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              Creating...
            </div>
          ) : (
            "Create Author"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/authors")}
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
