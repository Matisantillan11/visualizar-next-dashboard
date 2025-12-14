"use client";
import Breadcrumb from "@/components/breadcrumb";
import { UsersTable } from "@/components/tables/users";
import { UsersSkeleton } from "@/components/tables/users/skeleton";

import { useUsers } from "@/lib/react-query/users/users.queries";
import Link from "next/link";

export default function UsersPage() {
  const { data: users, isPending } = useUsers();

  return (
    <>
      <Breadcrumb pageName="Usuarios" />

      <div className="space-y-6">
        {/* Header with Add New User button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Usuarios
          </h2>
          <Link
            href="/users/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Agregar Nuevo Usuario
          </Link>
        </div>

        <div className="space-y-10">
          {isPending ? <UsersSkeleton /> : <UsersTable users={users ?? []} />}
        </div>
      </div>
    </>
  );
}
