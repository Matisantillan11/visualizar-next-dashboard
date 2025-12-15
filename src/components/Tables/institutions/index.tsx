import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
import { useDeleteInstitution } from "@/lib/react-query/institutions";
import { Institution } from "@/lib/react-query/institutions/institutions.types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export function InstitutionsTable({
  className,
  institutions,
}: {
  className?: string;
  institutions: Institution[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [institutionId, setInstitutionId] = useState<string | null>(null);
  const router = useRouter();

  const { mutateAsync: deleteInstitution, isPending: isDeleting } =
    useDeleteInstitution();

  const handleRowClick = (institution: Institution, columnId: string) => {
    if (columnId !== "actions") {
      const id = institution?.id;
      if (!id) return;
      router.push(`/institutions/${id}`);
    }
  };

  const handleOpenDeleteModal = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenErrorModal = (open: boolean) => {
    setIsErrorModalOpen(open);
  };

  const handleOpenDelete = (institutionId: string) => {
    setInstitutionId(institutionId);
    handleOpenDeleteModal(true);
  };

  const handleDelete = async () => {
    if (institutionId) {
      await deleteInstitution(
        { id: institutionId },
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
        Instituciones
      </h2>

      <Table
        data={institutions}
        columns={columnsDef}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleOpenDeleteModal}
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
          <DangerButton onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </DangerButton>
        </div>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onOpenChange={handleOpenErrorModal}
        title={"Tu institución no pudo ser eliminada"}
        description={
          <div className="my-5 text-center">
            <p>Lo sentimos, hubo un error al eliminar la institución.</p>
            <p>
              Para poder eliminar la institución, primero debes eliminar los
              alumnos inscritos y los libros asignados.
            </p>
          </div>
        }
      />
    </div>
  );
}
