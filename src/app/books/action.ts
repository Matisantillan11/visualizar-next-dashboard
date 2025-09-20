import { fetcher } from "@/lib/fetcher";
import { Book } from "@/types/book";

export default async function getBooks() {
  return await fetcher<Book[]>({ url: "/books" });
}
