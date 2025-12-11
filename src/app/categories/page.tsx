"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { CategoriesTable } from "@/components/Tables/categories";
import { CategoriesSkeleton } from "@/components/Tables/categories/skeleton";
import { useCategories } from "@/lib/react-query/categories";
import Link from "next/link";
import { Suspense } from "react";

export default function CategoriesPage() {
  const { data: categories } = useCategories();

  return (
    <>
      <Breadcrumb pageName="Categories" />

      <div className="space-y-6">
        {/* Header with Add New Category button */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-dark dark:text-white">
            Category Management
          </h2>
          <Link
            href="/categories/create"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Add New Category
          </Link>
        </div>

        <div className="space-y-10">
          <Suspense fallback={<CategoriesSkeleton />}>
            <CategoriesTable categories={categories ?? []} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
