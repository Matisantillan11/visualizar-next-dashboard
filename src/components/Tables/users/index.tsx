import Table from "@/components/ui/table";
import { cn } from "@/lib/utils";

import { User } from "@/lib/react-query/users/users.types";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

export function UsersTable({
  className,
  users,
}: {
  className?: string;
  users: User[];
}) {
  const router = useRouter();

  const handleRowClick = (row: User) => {
    const id = row?.id;
    if (id) {
      router.push(`/users/${id}`);
    }
  };

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

      <Table data={users} columns={columns} onRowClick={handleRowClick} />
    </div>
  );
}
