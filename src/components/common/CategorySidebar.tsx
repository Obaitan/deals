"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { LayoutGrid } from "lucide-react";

interface Category {
  slug: string;
  name: string;
  image?: string;
}

interface CategorySidebarProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect?: (slug: string | null) => void;
  categoryUrlBase?: string; // e.g., "/products" or "/services"
}

export function CategorySidebar({
  categories,
  selectedCategory,
  onCategorySelect,
  categoryUrlBase = "",
}: CategorySidebarProps) {
  const handleCategoryClick = (slug: string | null) => {
    if (onCategorySelect) {
      onCategorySelect(slug);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 sticky top-24">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <LayoutGrid className="h-5 w-5" />
        Categories
      </h3>

      <ul className="space-y-1">
        {/* All option */}
        <li>
          <Link
            href={categoryUrlBase}
            onClick={() => handleCategoryClick(null)}
            className={cn(
              "block px-3 py-2 rounded-lg text-sm transition-colors",
              selectedCategory === null
                ? "bg-emerald-100 text-emerald-700 font-medium"
                : "text-gray-600 hover:bg-gray-50"
            )}
          >
            All
          </Link>
        </li>

        {/* Category list */}
        {categories.map((category) => (
          <li key={category.slug}>
            <Link
              href={`${categoryUrlBase}?category=${category.slug}`}
              onClick={() => handleCategoryClick(category.slug)}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm transition-colors",
                selectedCategory === category.slug
                  ? "bg-emerald-100 text-emerald-700 font-medium"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
