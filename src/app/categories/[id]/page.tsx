import CategoryForm from "../create/_components/category-form";
import { getCategoryById } from "./action";

export default async function CategoryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params)?.id;
  const category = await getCategoryById(id);

  return <CategoryForm categoryId={id} category={category} />;
}
