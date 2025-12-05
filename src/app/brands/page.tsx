import { BrandCard } from "@/components/common/BrandCard";
import brandsData from "@/data/brands.json";

export default function BrandsIndexPage() {
  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-6 md:px-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          All Brands
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {brandsData.map((brand) => (
            <BrandCard key={brand.slug} brand={brand} />
          ))}
        </div>
      </div>
    </main>
  );
}
