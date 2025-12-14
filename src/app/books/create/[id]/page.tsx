import Breadcrumb from "@/components/breadcrumb";
import BookForm from "./_components/book-form";

export default async function CreateBookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);

  return (
    <>
      <Breadcrumb pageName="Crear Libro" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* Create Book Form */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Crear Nuevo Libro
              </h3>
            </div>

            <BookForm />
          </div>
        </div>
      </div>
    </>
  );
}
