"use client";

import { InputFormField } from "@/components/ui/form/input-form-field";
import { InputFormSelect } from "@/components/ui/form/input-form-select";
import { useCreateCourse } from "@/lib/react-query/courses";
import { useUpdateCourse } from "@/lib/react-query/courses/courses.mutations";
import { useInstitutions } from "@/lib/react-query/institutions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { CourseResponse } from "../../[id]/utils";
import { courseSchema } from "./form-schema";

interface CreateCourseFormData {
  name: string;
  institutionId: string;
}

export default function CourseForm({
  courseId,
  course,
}: {
  courseId?: string;
  course?: CourseResponse;
}) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      institutionId: "",
    },
    values: {
      name: course?.name ?? "",
      institutionId: course?.institution?.id ?? "",
    },
    resolver: zodResolver(courseSchema),
  });

  const { data: institutions, isPending: loadingInstitutions } =
    useInstitutions();
  const { mutate: createCourse, isPending, isSuccess } = useCreateCourse();

  const { mutate: updateCourse, isPending: updatePending } = useUpdateCourse();

  const handleSubmit = async (data: CreateCourseFormData) => {
    if (!courseId) {
      try {
        await createCourse({
          name: data.name,
          institutionId: data.institutionId,
        });
      } catch (error) {
        console.error("Error creating course:", error);
      }
    } else {
      try {
        await updateCourse({
          id: courseId,
          name: data.name,
          institutionId: data.institutionId,
          institutionCourseId: course?.institutionCourseId,
        });
      } catch (error) {
        console.error("Error updating course:", error);
      }
    }
  };

  const institutionOptions = institutions?.map((institution) => ({
    value: institution.id,
    label: institution.name,
  }));

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6.5">
        <div className="mb-4.5">
          <InputFormField
            name="name"
            label="Nombre del Curso"
            type="text"
            placeholder="Ingrese el nombre del curso"
            required
            form={form}
          />
        </div>

        <div className="mb-6">
          <InputFormSelect
            form={form}
            name="institutionId"
            label="Institución"
            items={institutionOptions ?? []}
            placeholder={
              loadingInstitutions
                ? "Cargando instituciones..."
                : "Seleccione la institución"
            }
            required
            disabled={loadingInstitutions}
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
            ) : !courseId ? (
              "Crear Curso"
            ) : null}
            {updatePending ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                Actualizando...
              </div>
            ) : courseId ? (
              "Actualizar Curso"
            ) : null}
          </button>

          <button
            type="button"
            onClick={() => router.push("/courses")}
            disabled={isPending || updatePending}
            className="flex w-full justify-center rounded-lg border border-stroke bg-white p-3 font-medium text-dark hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
