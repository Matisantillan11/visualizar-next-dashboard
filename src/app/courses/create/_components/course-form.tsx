"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import { useCreateCourse } from "@/lib/react-query/courses";
import { useInstitutions } from "@/lib/react-query/institutions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CreateCourseFormData {
  name: string;
  institutionId: string;
}

export default function CourseForm() {
  const router = useRouter();
  const { data: institutions, isPending: loadingInstitutions } =
    useInstitutions();
  const { mutate: createCourse, isPending, isSuccess } = useCreateCourse();

  const [formData, setFormData] = useState<CreateCourseFormData>({
    name: "",
    institutionId: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        name: "",
        institutionId: "",
      });
    }
  }, [isSuccess]);

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

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createCourse({
        name: formData.name,
        institutionId: formData.institutionId,
      });
    } catch (error) {
      console.error("Error creating course:", error);
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
    };

  const institutionOptions = institutions?.map((institution) => ({
    value: institution.id,
    label: institution.name,
  }));

  return (
    <form action={handleSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Course Name"
          type="text"
          placeholder="Enter course name"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="institutionId"
          label="Institution"
          items={institutionOptions ?? []}
          placeholder={
            loadingInstitutions
              ? "Loading institutions..."
              : "Select institution"
          }
          required
          disabled={loadingInstitutions}
          value={formData.institutionId}
          onChange={handleInputChange("institutionId")}
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
              Creating...
            </div>
          ) : (
            "Create Course"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/courses")}
          disabled={isPending}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
