import UserForm from "../create/_components/user-form";
import { getUserById } from "./action";

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userData = await getUserById(id);
  console.log({ userData });
  return <UserForm userId={id} user={userData} />;
}
