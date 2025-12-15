import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
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
  const router = useRouter();

  const handleRowClick = (row: Course) => {
    const courseId = row?.id;
    if (!courseId) return;
    router.push(`/courses/${courseId}`);
  };

  const handleModalOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleDeleteCourse = () => {
    setIsOpen(false);
  };

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

      <Table
        data={courses}
        columns={columns}
        onRowClick={(row) => handleRowClick(row)}
      />

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
          <OutlineButton onClick={() => setIsOpen(false)}>
            Cancelar
          </OutlineButton>
          <DangerButton onClick={handleDeleteCourse}>Eliminar</DangerButton>
        </div>
      </Modal>
    </div>
  );
}
