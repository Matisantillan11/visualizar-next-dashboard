"use server";

import { fetcher } from "@/lib/fetcher";
import { User } from "@/types/user";

export default async function getUsers() {
  return await fetcher<User[]>({ url: "/users" });
}
