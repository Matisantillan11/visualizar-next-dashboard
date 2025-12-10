import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UsersTable } from "@/components/Tables/users";
import { UsersSkeleton } from "@/components/Tables/users/skeleton";

import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import getUsers from "./action";

export const metadata: Metadata = {
  title: "Users",
};

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="space-y-6">
        {/* Header with Add New User button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            User Management
          </h2>
          <Link
            href="/users/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add New User
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<UsersSkeleton />}>
            <UsersTable users={users} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
