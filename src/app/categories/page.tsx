import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Suspense } from "react";
import getCategories from "./action";
import { CategoriesTable } from "@/components/Tables/categories";
import { CategoriesSkeleton } from "@/components/Tables/categories/skeleton";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <>
      <Breadcrumb pageName="Categories" />

      <div className="space-y-10">
        <Suspense fallback={<CategoriesSkeleton />}>
          <CategoriesTable categories={categories} />
        </Suspense>
      </div>
    </>
  );
}
