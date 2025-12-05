"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/common/ProductCard";
import {
  ProductFilters,
  ProductFilterOptions,
} from "@/components/common/ProductFilters";
import { CategorySidebar } from "@/components/common/CategorySidebar";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import brandsData from "@/data/brands.json";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [filters, setFilters] = useState<ProductFilterOptions>({
    shipping: [],
    priceRange: [0, 1000000],
    discountMin: 0,
    brands: [],
  });

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter products based on category and filters
  const filteredProducts = productsData.filter((product) => {
    // Category filter
    if (selectedCategory) {
      const category = categoriesData.find((c) => c.slug === selectedCategory);
      if (category && product.category !== category.name) {
        return false;
      }
    }

    // Price filter
    if (product.price > filters.priceRange[1]) {
      return false;
    }

    // Discount filter
    if (product.discount < filters.discountMin) {
      return false;
    }

    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false;
    }

    return true;
  });

  // Get available brands from all products
  const availableBrands = brandsData.map((b) => b.name);

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 md:px-10 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Products</h1>
          <p className="text-gray-600">
            Discover amazing deals on products across categories
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Filters */}
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableBrands={availableBrands}
            />

            {/* Product Grid */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product as any} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters or select a different category
                </p>
              </div>
            )}
          </div>

          {/* Category Sidebar (Right) */}
          <aside className="lg:w-64 order-1 lg:order-2">
            <CategorySidebar
              categories={categoriesData}
              selectedCategory={selectedCategory}
              categoryUrlBase="/products"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
