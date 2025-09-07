import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UsersTable } from "@/components/Tables/users";
import { UsersSkeleton } from "@/components/Tables/users/skeleton";

import { Metadata } from "next";
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

      <div className="space-y-10">
        <Suspense fallback={<UsersSkeleton />}>
          <UsersTable users={users} />
        </Suspense>
      </div>
    </>
  );
}
