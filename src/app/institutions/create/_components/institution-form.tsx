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
      newErrors.name = "El nombre de la institución es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        "El nombre de la institución debe tener al menos 2 caracteres";
    }

    if (!formData.address.trim()) {
      newErrors.address = "La dirección es requerida";
    } else if (formData.address.trim().length < 5) {
      newErrors.address = "La dirección debe tener al menos 5 caracteres";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "El número de teléfono es requerido";
    } else if (!/^[\d\s\-\+\(\)]+$/.test(formData.phone.trim())) {
      newErrors.phone = "Por favor ingrese un número de teléfono válido";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Por favor ingrese un email válido";
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
          label="Nombre de la Institución"
          type="text"
          placeholder="Ingrese el nombre de la institución"
          required
          value={formData.name}
          onChange={handleInputChange("name")}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="address"
          label="Dirección"
          type="text"
          placeholder="Ingrese la dirección de la institución"
          required
          value={formData.address}
          onChange={handleInputChange("address")}
        />
      </div>

      <div className="mb-4.5">
        <FormInput
          name="phone"
          label="Número de Teléfono"
          type="tel"
          placeholder="Ingrese el número de teléfono"
          required
          value={formData.phone}
          onChange={handleInputChange("phone")}
        />
      </div>

      <div className="mb-6">
        <FormInput
          name="email"
          label="Dirección de Email"
          type="email"
          placeholder="Ingrese la dirección de email"
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
              Creando...
            </div>
          ) : (
            "Crear Institución"
          )}
        </button>

        <button
          type="button"
          onClick={() => router.push("/institutions")}
          disabled={isPending}
          className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
