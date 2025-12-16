"use client";
import Breadcrumb from "@/components/breadcrumb";
import { UsersTable } from "@/components/tables/users";
import { UsersSkeleton } from "@/components/tables/users/skeleton";

import { useUsers } from "@/lib/react-query/users/users.queries";
import { User } from "@/lib/react-query/users/users.types";
import Link from "next/link";
import { useMemo, useState } from "react";
import { UserFilters } from "./components/filters";

export default function UsersPage() {
  const { data: users, isPending } = useUsers();

  const [fuzzyText, setFuzzyText] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | undefined>(
    undefined,
  );

  const onHandleFuzzyText = (str: string) => {
    setFuzzyText(str);
  };

  const handleOnSelectedRole = (role?: string) => {
    setSelectedRole(role);
  };

  console.log({ selectedRole, fuzzyText });

  const userList = useMemo(() => {
    if (fuzzyText?.length > 0) {
      return users?.filter((user: User) => {
        return (
          user.name.toLowerCase().includes(fuzzyText.toLowerCase()) ||
          user.email.toLowerCase().includes(fuzzyText.toLowerCase()) ||
          user.dni.toLowerCase().includes(fuzzyText.toLowerCase())
        );
      });
    }

    if (selectedRole) {
      return users?.filter((user: User) => {
        return selectedRole === user.role;
      });
    }

    return users;
  }, [users, fuzzyText, selectedRole]);

  console.log({ userList });

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

        <UserFilters
          fuzzyText={fuzzyText}
          handleFuzzy={onHandleFuzzyText}
          onSelectRole={handleOnSelectedRole}
          selectedRole={selectedRole}
        />

        <div className="space-y-10">
          {isPending ? (
            <UsersSkeleton />
          ) : (
            <UsersTable users={userList ?? []} />
          )}
        </div>
      </div>
    </>
  );
}
