import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import AuthorForm from "./_components/author-form";

export default function CreateAuthorPage() {
  return (
    <>
      <Breadcrumb pageName="Crear Autor" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* Create Author Form */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Crear Nuevo Autor
              </h3>
            </div>

            <AuthorForm />
          </div>
        </div>
      </div>
    </>
  );
}
