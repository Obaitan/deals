import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { CouponCard } from "@/components/common/CouponCard";
import { CategoryCard } from "@/components/common/CategoryCard";
import { BrandCard } from "@/components/common/BrandCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight, Zap, Tag, Star } from "lucide-react";

// Mock Data Imports
import productsData from "@/data/products.json";
import couponsData from "@/data/coupons.json";
import categoriesData from "@/data/categories.json";
import brandsData from "@/data/brands.json";

export default function Home() {
  const featuredProducts = productsData.slice(0, 4);
  const topCoupons = couponsData.slice(0, 3);
  const featuredCategories = categoriesData.slice(0, 6);
  const popularBrands = brandsData.slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-emerald-900 text-white py-20 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://placehold.co/1920x600/064e3b/064e3b/png')] opacity-10 mix-blend-overlay"></div>
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-20"></div>
          
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              Find the best deals & coupons <br/>
              <span className="text-emerald-400">in Nigeria and beyond.</span>
            </h1>
            <p className="text-emerald-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Save money on electronics, fashion, phones, and more from your favorite stores like Jumia, Konga, and AliExpress.
            </p>
            
            <div className="bg-white p-2 rounded-full shadow-xl max-w-2xl mx-auto flex items-center">
              <Search className="ml-4 text-gray-400 h-6 w-6" />
              <Input 
                className="border-0 shadow-none focus-visible:ring-0 text-gray-900 text-lg placeholder:text-gray-400 h-12"
                placeholder="What are you looking for today?" 
              />
              <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 h-12 text-base">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Categories</h2>
                <p className="text-gray-500">Find exactly what you need</p>
              </div>
              <Button variant="link" className="text-emerald-600 hover:text-emerald-700">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {featuredCategories.map((cat) => (
                <CategoryCard key={cat.slug} category={cat} />
              ))}
            </div>
          </div>
        </section>

        {/* Trending Deals Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Trending Deals</h2>
                <p className="text-gray-500">Hot picks just for you</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Popular Brands Section */}
        <section className="py-16 bg-white border-y border-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Popular Brands</h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {popularBrands.map((brand) => (
                <BrandCard key={brand.slug} brand={brand} />
              ))}
            </div>
          </div>
        </section>

        {/* Top Coupons Section */}
        <section className="py-16 bg-emerald-50/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Tag className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Top Coupons</h2>
                <p className="text-gray-500">Verified codes to save you more</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
            
            <div className="mt-10 text-center">
              <Button size="lg" variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                View All Coupons
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
