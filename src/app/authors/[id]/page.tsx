import AuthorForm from "../create/_components/author-form";
import { getAuthorById } from "./action";

export default async function AuthorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const author = await getAuthorById(id);

  return <AuthorForm authorId={id} author={author} />;
}
