import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { CouponCard } from "@/components/common/CouponCard";
import productsData from "@/data/products.json";
import brandsData from "@/data/brands.json";
import couponsData from "@/data/coupons.json"; // Assuming we might have brand-specific coupons later
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;

  const brand = brandsData.find((b) => b.slug === slug);
  
  if (!brand) {
    notFound();
  }

  const products = productsData.filter(
    (p) => p.brand.toLowerCase() === brand.name.toLowerCase()
  );

  // Mock filtering for coupons - in real app would link by brand ID/slug
  const coupons = couponsData.slice(0, 2); 

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Brand Header */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-12 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-white rounded-full shadow-sm p-4 mb-4 flex items-center justify-center">
              <div className="relative w-full h-full">
                <Image 
                  src={brand.logo} 
                  alt={brand.name} 
                  fill 
                  className="object-contain"
                />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{brand.name}</h1>
            <p className="text-gray-500 max-w-lg">
              Discover the best deals and coupons from {brand.name}. Updated daily to help you save.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Coupons Section */}
          <div className="mb-16">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Active Coupons</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Deals</h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No active deals for this brand at the moment.</p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
