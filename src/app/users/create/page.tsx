import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import UserForm from "./_components/user-form";

export default function CreateUserPage() {
  return (
    <>
      <Breadcrumb pageName="Create User" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* Create User Form */}
          <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
            <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
              <h3 className="font-medium text-dark dark:text-white">
                Create New User
              </h3>
            </div>

            <UserForm />
          </div>
        </div>
      </div>
    </>
  );
}
