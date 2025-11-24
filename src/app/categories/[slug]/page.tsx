import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { notFound } from "next/navigation";

// Correctly type the props for Next.js App Router dynamic pages
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  // Await the params object
  const { slug } = await params;

  const category = categoriesData.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  // In a real app, we would filter by category slug. 
  // For mock data, we'll just filter by name loosely or show all if match fails for demo.
  const products = productsData.filter(
    (p) => p.category.toLowerCase() === category.name.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{category.name}</h1>
              <p className="text-gray-500">Found {products.length} deals</p>
            </div>
            
            <Button variant="outline" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Product Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-lg">
              <p className="text-gray-500 text-lg">No deals found in this category yet.</p>
              <Button className="mt-4" variant="link">Browse all categories</Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
