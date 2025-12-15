import { DangerButton } from "@/components/danger-button";
import { OutlineButton } from "@/components/outline-button";
import { Modal } from "@/components/ui/dialog";
import Table from "@/components/ui/table";
import { useDeleteBook } from "@/lib/react-query/books/books.mutations";
import { Book } from "@/lib/react-query/books/books.types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";

export function BooksTable({
  className,
  books,
}: {
  className?: string;
  books: Book[];
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [bookId, setBookId] = useState<string | null>(null);

  const { mutateAsync: deleteBook, isPending: isDeleting } = useDeleteBook();

  const handleRowClick = (book: Book, columnId: string) => {
    if (columnId !== "actions") {
      const id = book?.id;
      if (!id) return;
      router.push(`/books/${id}`);
    }
  };

  const handleModalOpen = (open: boolean) => {
    setIsOpen(open);
  };

  const handleOpenErrorModal = (open: boolean) => {
    setIsErrorModalOpen(open);
  };

  const handleOpenDelete = (id: string) => {
    setBookId(id);
    handleModalOpen(true);
  };

  const handleDeleteBook = async () => {
    if (bookId) {
      await deleteBook(bookId, {
        onSuccess: () => {
          setIsOpen(false);
        },
        onError: () => {
          setIsOpen(false);
          setIsErrorModalOpen(true);
        },
      });
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
        Libros
      </h2>

      <Table data={books} columns={columnsDef} onRowClick={handleRowClick} />

      <Modal
        isOpen={isOpen}
        onOpenChange={handleModalOpen}
        title="¿Estas seguro de eliminar este libro?"
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
          <DangerButton onClick={handleDeleteBook} disabled={isDeleting}>
            {isDeleting ? "Eliminando..." : "Eliminar"}
          </DangerButton>
        </div>
      </Modal>

      <Modal
        isOpen={isErrorModalOpen}
        onOpenChange={handleOpenErrorModal}
        title={"Tu libro no pudo ser eliminado"}
        description={
          <div className="my-5 text-center">
            <p>Lo sentimos, hubo un error al eliminar el libro.</p>
          </div>
        }
      />
    </div>
  );
}
