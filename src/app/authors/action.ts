import { fetcher } from "@/lib/fetcher";
import { Author } from "@/types/author";

export default async function getAuthors() {
  return await fetcher<Author[]>({ url: "/authors" });
}
