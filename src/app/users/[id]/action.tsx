import { fetcher } from "@/lib/fetcher";
import { User } from "@/lib/react-query/users/users.types";

export const getUserById = async (id: string): Promise<User> => {
  return await fetcher<User>({ url: `/users/${id}` });
};
