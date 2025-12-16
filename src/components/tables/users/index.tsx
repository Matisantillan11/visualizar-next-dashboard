import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
import Table from "@/components/ui/table";
import { useDeleteUser } from "@/lib/react-query/users";
import { User } from "@/lib/react-query/users/users.types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export function UsersTable({
  className,
  users,
}: {
  className?: string;
  users: User[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const { mutateAsync: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleRowClick = (row: User, columnId: string) => {
    if (columnId !== "actions") {
      const id = row?.id;
      if (id) {
        router.push(`/users/${id}`);
      }
    }
  };

  const handleModalOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenErrorModal = (open: boolean) => {
    setIsErrorModalOpen(open);
  };

  const handleOpenDelete = (id: string) => {
    setUserId(id);
    handleModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (userId) {
      await deleteUser(
        { id: userId },
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
        Usuarios
      </h2>

      <Table data={users} columns={columnsDef} onRowClick={handleRowClick} />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalOpen}
        title="¿Estas seguro de eliminar este usuario?"
        description={
          <div className="my-5 text-center">
            <p>Esta acción no se puede deshacer.</p>
          </div>
        }
      >
        <div className="flex w-full justify-end gap-4">
          <OutlineButton onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancelar
          </OutlineButton>
          <DangerButton onClick={handleDeleteUser} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </DangerButton>
        </div>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onOpenChange={handleOpenErrorModal}
        title={"Tu usuario no pudo ser eliminado"}
        description={
          <div className="my-5 text-center">
            <p>Lo sentimos, hubo un error al eliminar el usuario.</p>
          </div>
        }
      />
    </div>
  );
}
