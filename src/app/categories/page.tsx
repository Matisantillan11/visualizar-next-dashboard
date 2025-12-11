"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CategoriesTable } from "@/components/Tables/categories";
import { CategoriesSkeleton } from "@/components/Tables/categories/skeleton";
import { useCategories } from "@/lib/react-query/categories";
import Link from "next/link";

export default function CategoriesPage() {
  const { data: categories, isPending } = useCategories();

  return (
    <>
      <Breadcrumb pageName="Categorías" />

      <div className="space-y-6">
        {/* Header with Add New Category button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Gestión de Categorías
          </h2>
          <Link
            href="/categories/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Agregar Nueva Categoría
          </Link>
        </div>

        <div className="space-y-10">
          {isPending ? (
            <CategoriesSkeleton />
          ) : (
            <CategoriesTable categories={categories ?? []} />
          )}
        </div>
      </div>
    </>
  );
}
