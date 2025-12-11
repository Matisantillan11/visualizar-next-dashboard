import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { User } from "@/types/user";
import { columns } from "./columns";

export async function UsersTable({
  className,
  users,
}: {
  className?: string;
  users: User[];
}) {
  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-4 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Usuarios
      </h2>

      <Table data={users} columns={columns} />
    </div>
  );
}
