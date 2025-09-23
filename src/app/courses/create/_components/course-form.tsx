"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import { Institution } from "@/types/institutions";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createCourse } from "../action";

interface CreateCourseFormData {
  name: string;
  institutionId: string;
}

export default function CourseForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loadingInstitutions, setLoadingInstitutions] = useState(true);
  const [formData, setFormData] = useState<CreateCourseFormData>({
    name: "",
    institutionId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch institutions on component mount
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const response = await fetch("/api/institutions");
        if (response.ok) {
          const institutionsData = await response.json();
          setInstitutions(institutionsData);
        } else {
          console.error("Failed to fetch institutions");
        }
      } catch (error) {
        console.error("Error fetching institutions:", error);
      } finally {
        setLoadingInstitutions(false);
      }
    };

    fetchInstitutions();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Course name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Course name must be at least 2 characters";
    }

    if (!formData.institutionId) {
      newErrors.institutionId = "Institution is required";
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
      const result = await createCourse(formDataObj);

      if (result.success) {
        console.log("Course created successfully:", result.data);
        router.push("/courses");
      } else {
        setErrors({ submit: result.error || "Failed to create course" });
      }
    } catch (error) {
      console.error("Error creating course:", error);
      setErrors({ submit: "Failed to create course. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof CreateCourseFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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

  const institutionOptions = institutions.map((institution) => ({
    value: institution.id,
    label: institution.name,
  }));

  return (
    <form action={handleServerActionSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Course Name"
          type="text"
          placeholder="Enter course name"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="institutionId"
          label="Institution"
          items={institutionOptions}
          placeholder={
            loadingInstitutions
              ? "Loading institutions..."
              : "Select institution"
          }
          required
          disabled={loadingInstitutions}
          value={formData.institutionId}
          onChange={handleInputChange("institutionId")}
          error={errors.institutionId}
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
            "Create Course"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/courses")}
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
