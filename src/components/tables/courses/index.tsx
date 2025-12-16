import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
import { useDeleteCourse } from "@/lib/react-query/courses";
import { Course } from "@/lib/react-query/courses/courses.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export function CoursesTable({
  className,
  courses,
}: {
  className?: string;
  courses: Course[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [courseId, setCourseId] = useState<string | null>(null);
  const router = useRouter();

  const { mutateAsync: deleteCourse, isPending: isDeleting } =
    useDeleteCourse();

  const handleRowClick = (row: Course, columnId: string) => {
    if (columnId !== "actions") {
      const courseId = row?.id;
      if (!courseId) return;
      router.push(`/courses/${courseId}`);
    }
  };

  const handleModalOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenErrorModal = (open: boolean) => {
    setIsErrorModalOpen(open);
  };

  const handleOpenDelete = (id: string) => {
    setCourseId(id);
    handleModalOpen(true);
  };

  const handleDeleteCourse = async () => {
    if (courseId) {
      await deleteCourse(
        { id: courseId },
        {
          onSuccess: () => {
            setIsOpen(false);
          },
          onError: () => {
            setIsOpen(false);
            setIsErrorModalOpen(true);
          },
        },
      );
    }
  };

  const columnsDef = columns(handleOpenDelete);

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Cursos
      </h2>

      <Table data={courses} columns={columnsDef} onRowClick={handleRowClick} />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalOpen}
        title="¿Estas seguro de eliminar este curso?"
        description={
          <div className="my-5 text-center">
            <p>Esta acción no se puede deshacer.</p>
            <p>
              Si tienes alumnos inscritos en este curso o libros asignados a
              este curso, primero debes eliminarlos/modificarlos.
            </p>
          </div>
        }
      >
        <div className="flex w-full justify-end gap-4">
          <OutlineButton onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancelar
          </OutlineButton>
          <DangerButton onClick={handleDeleteCourse} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </DangerButton>
        </div>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onOpenChange={handleOpenErrorModal}
        title={"Tu curso no pudo ser eliminado"}
        description={
          <div className="my-5 text-center">
            <p>Lo sentimos, hubo un error al eliminar el curso.</p>
            <p>
              Para poder eliminar el curso, primero debes eliminar los alumnos
              inscritos y los libros asignados.
            </p>
          </div>
        }
      />
    </div>
  );
}
