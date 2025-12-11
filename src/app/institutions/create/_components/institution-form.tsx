"use client";

import FormInput from "@/components/FormElements/form-input";
import { useCreateInstitution } from "@/lib/react-query/institutions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface CreateInstitutionFormData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export default function InstitutionForm() {
  const router = useRouter();

  const [formData, setFormData] = useState<CreateInstitutionFormData>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const {
    mutateAsync: createInstitution,
    isPending,
    isSuccess,
  } = useCreateInstitution();

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Institution name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Institution name must be at least 2 characters";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "Address must be at least 5 characters";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await createInstitution({
        name: formData.name,
        address: formData.address,
        phone: formData.phone,
        email: formData.email,
      });
    } catch (error) {
      console.error("Error creating institution:", error);
    }
  };

  const handleInputChange =
    (field: keyof CreateInstitutionFormData) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
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
        address: "",
        phone: "",
        email: "",
      });
    }
  }, [isSuccess]);

  return (
    <form action={handleSubmit} className="p-6.5">
      <div className="mb-4.5">
        <FormInput
          name="name"
          label="Institution Name"
          type="text"
          placeholder="Enter institution name"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="address"
          label="Address"
          type="text"
          placeholder="Enter institution address"
          required
          value={formData.address}
          onChange={handleInputChange("address")}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="Enter phone number"
          required
          value={formData.phone}
          onChange={handleInputChange("phone")}
        />
      </div>

      <div className="mb-6">
        <FormInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter email address"
          required
          value={formData.email}
          onChange={handleInputChange("email")}
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
            "Create Institution"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/institutions")}
          disabled={isPending}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
