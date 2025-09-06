import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { UsersTable } from "@/components/Tables/users";
import { TopChannelsSkeleton } from "@/components/Tables/users/skeleton";

import { Metadata } from "next";
import { Suspense } from "react";
import getUsers from "./action";

export const metadata: Metadata = {
  title: "Users",
};

export default async function Page() {
  const users = await getUsers();
  return (
    <>
      <Breadcrumb pageName="Users" />

      <div className="space-y-10">
        <Suspense fallback={<TopChannelsSkeleton />}>
          <UsersTable users={users} />
        </Suspense>
      </div>
    </>
  );
}
