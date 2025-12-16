"use client";
import { EmailIcon } from "@/assets/icons";
import { useAuth } from "@/contexts/auth-context";
import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { InputFormField } from "../ui/form/input-form-field";
import OTPVerification from "./OTPVerification";

const schema = z.object({
  email: z.string().email({
    message: "Invalid email address",
  }),
});

export default function SigninWithPassword() {
  const { sendOTP } = useAuth();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
    values: {
      email: "",
    },
  });
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
   const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { email: string }) => {
    setLoading(true);
    setError(null)
    try {
      await sendOTP(data.email);
      setShowOTP(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error enviando codigo OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToEmail = () => {
    setShowOTP(false);
  };

  if (showOTP) {
    return (
      <OTPVerification
        email={form.getValues("email")}
        onBack={handleBackToEmail}
      />
    );
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="mb-6">
          <h2 className="sm:text-title-xl2 mb-2 text-2xl font-bold text-black dark:text-white">
            Iniciar sesión
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Ingresá tu correo electrónico para recibir tu código de verificación
          </p>
        </div>

        {form.formState.errors.email && (
          <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
            {form.formState.errors.email.message}
          </div>
        )}

        {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-4 text-sm text-red-700 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}


        <InputFormField
          form={form}
          type="email"
          label="Email"
          className="mb-6 [&_input]:py-[15px]"
          placeholder="Ingresa tu correo electrónico"
          name="email"
          icon={<EmailIcon />}
          required
        />

        <div className="my-4">
          <button
            type="submit"
            disabled={loading || !form.watch("email").trim()}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary p-4 font-medium text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Enviar código de verificación
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-white border-t-transparent" />
            )}
          </button>
        </div>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            Te enviaremos un código secure de 6 dìgitos para verificar tu identidad.
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
