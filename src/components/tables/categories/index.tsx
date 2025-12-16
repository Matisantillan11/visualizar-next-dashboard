import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
import Table from "@/components/ui/table";
import { useDeleteCategory } from "@/lib/react-query/categories";
import { Category } from "@/lib/react-query/categories/categories.types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export function CategoriesTable({
  className,
  categories,
}: {
  className?: string;
  categories: Category[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const { mutateAsync: deleteCategory, isPending: isDeleting } =
    useDeleteCategory();

  const handleRowClick = (row: Category, columnId: string) => {
    if (columnId !== "actions") {
      const id = row?.id;
      if (!id) return;
      router.push(`/categories/${id}`);
    }
  };

  const handleModalOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenErrorModal = (open: boolean) => {
    setIsErrorModalOpen(open);
  };

  const handleOpenDelete = (id: string) => {
    setCategoryId(id);
    handleModalOpen(true);
  };

  const handleDeleteCategory = async () => {
    if (categoryId) {
      await deleteCategory(
        { id: categoryId },
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
        Categorias de libros
      </h2>

      <Table
        data={categories}
        columns={columnsDef}
        onRowClick={handleRowClick}
      />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalOpen}
        title="¿Estas seguro de eliminar esta categoria?"
        description={
          <div className="my-5 text-center">
            <p>Esta acción no se puede deshacer.</p>
            <p>
              Si esta categoria tiene libros asignados, primero debes
              modificarlos.
            </p>
          </div>
        }
      >
        <div className="flex w-full justify-end gap-4">
          <OutlineButton onClick={() => setIsOpen(false)} disabled={isDeleting}>
            Cancelar
          </OutlineButton>
          <DangerButton onClick={handleDeleteCategory} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </DangerButton>
        </div>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onOpenChange={handleOpenErrorModal}
        title={"Tu categoria no pudo ser eliminada"}
        description={
          <div className="my-5 text-center">
            <p>Lo sentimos, hubo un error al eliminar la categoria.</p>
            <p>Verifique que no tenga libros asociados.</p>
          </div>
        }
      />
    </div>
  );
}
