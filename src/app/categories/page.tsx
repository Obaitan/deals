import { CategoryCard } from "@/components/common/CategoryCard";
import categoriesData from "@/data/categories.json";

export default function CategoriesIndexPage() {
  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-6 md:px-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          All Categories
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categoriesData.map((cat) => (
            <CategoryCard key={cat.slug} category={cat} />
          ))}
        </div>
      </div>
    </main>
  );
}
