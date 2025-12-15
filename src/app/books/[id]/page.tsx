import BookForm from "@/app/books/create/[id]/_components/book-form";
import { getBookById } from "./action";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const book = await getBookById(id);

  return <BookForm bookId={id} book={book} />;
}
