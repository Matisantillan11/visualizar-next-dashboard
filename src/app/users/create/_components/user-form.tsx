"use client";

import FormInput from "@/components/FormElements/form-input";
import FormSelect from "@/components/FormElements/form-select";
import { Role } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createUser } from "../action";

interface CreateUserFormData {
  name: string;
  email: string;
  dni: string;
  role: Role;
}

export default function UserForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CreateUserFormData>({
    name: "",
    email: "",
    dni: "",
    role: "" as Role,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = [
    { value: Role.ADMIN, label: "Admin" },
    { value: Role.TEACHER, label: "Teacher" },
    { value: Role.STUDENT, label: "Student" },
  ];

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.dni.trim()) {
      newErrors.dni = "DNI is required";
    } else if (!/^\d{7,8}$/.test(formData.dni.trim())) {
      newErrors.dni = "DNI must be 7 or 8 digits";
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
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
      const result = await createUser(formDataObj);
      if (result.data.user) {
        console.log("User created successfully:", result.data.user);
        router.push("/users");
      } else {
        setErrors({ submit: result.error || "Failed to create user" });
      }
    } catch (error) {
      console.error("Error creating user:", error);
      setErrors({ submit: "Failed to create user. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange =
    (field: keyof CreateUserFormData) =>
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

  // Using Server Actions (recommended)
  return (
    <form action={handleServerActionSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Full Name"
          type="text"
          placeholder="Enter full name"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
          error={errors.name}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          required
          value={formData.email}
          onChange={handleInputChange("email")}
          error={errors.email}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="dni"
          label="DNI"
          type="text"
          placeholder="Enter DNI number"
          required
          value={formData.dni}
          onChange={handleInputChange("dni")}
          error={errors.dni}
        />
      </div>

      <div className="mb-6">
        <FormSelect
          name="role"
          label="Role"
          items={roleOptions}
          placeholder="Select user role"
          required
          value={formData.role}
          onChange={handleInputChange("role")}
          error={errors.role}
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
            "Create User"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/users")}
          disabled={isLoading}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  // Alternative: Using API Routes (uncomment to use this approach instead)
  /*
  return (
    <form onSubmit={handleApiSubmit} className="p-6.5">
      // ... same form fields as above ...
    </form>
  );
  */
}
