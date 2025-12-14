import { fetcher } from "@/lib/fetcher";
import { Book } from "@/lib/react-query/books";

export async function getBookById(id: string): Promise<Book> {
  return await fetcher({ url: `/books/${id}` });
}
