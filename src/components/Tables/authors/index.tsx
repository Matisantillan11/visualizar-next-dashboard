import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
import Table from "@/components/ui/table";
import { useDeleteAuthor } from "@/lib/react-query/authors";
import { Author } from "@/lib/react-query/authors/author.types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export function AuthorsTable({
  className,
  authors,
}: {
  className?: string;
  authors: Author[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [authorId, setAuthorId] = useState<string | null>(null);

  const { mutateAsync: deleteAuthor, isPending: isDeleting } =
    useDeleteAuthor();

  const handleRowClick = (row: Author, columnId: string) => {
    if (columnId !== "actions") {
      const authorId = row?.id;
      if (!authorId) return;
      router.push(`/authors/${authorId}`);
    }
  };

  const handleModalOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenErrorModal = (open: boolean) => {
    setIsErrorModalOpen(open);
  };

  const handleOpenDelete = (id: string) => {
    setAuthorId(id);
    handleModalOpen(true);
  };

  const handleDeleteAuthor = async () => {
    if (authorId) {
      await deleteAuthor(
        { id: authorId },
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
        Autores
      </h2>

      <Table data={authors} columns={columnsDef} onRowClick={handleRowClick} />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalOpen}
        title="¿Estas seguro de eliminar este autor?"
        description={
          <div className="my-5 text-center">
            <p>Esta acción no se puede deshacer.</p>
            <p>
              Si este autor tiene libros asignados, primero debes eliminarlos o
              reasignarlos.
            </p>
          </div>
        }
      >
        <div className="flex w-full justify-end gap-4">
          <OutlineButton onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancelar
          </OutlineButton>
          <DangerButton onClick={handleDeleteAuthor} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </DangerButton>
        </div>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onOpenChange={handleOpenErrorModal}
        title={"Tu autor no pudo ser eliminado"}
        description={
          <div className="my-5 text-center">
            <p>Lo sentimos, hubo un error al eliminar el autor.</p>
            <p>Verifique que no tenga libros asociados.</p>
          </div>
        }
      />
    </div>
  );
}
