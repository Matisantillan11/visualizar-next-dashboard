import { fetcher } from "@/lib/fetcher";
import { Author } from "@/lib/react-query/authors/author.types";

export async function getAuthorById(id: string): Promise<Author> {
  return await fetcher({ url: `/authors/${id}` });
}
