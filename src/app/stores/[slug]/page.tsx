import { ProductCard } from "@/components/common/ProductCard";
import { CouponCard } from "@/components/common/CouponCard";
import productsData from "@/data/products.json";
import storesData from "@/data/stores.json";
import couponsData from "@/data/coupons.json";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function StorePage({ params }: PageProps) {
  const { slug } = await params;

  const store = storesData.find((s) => s.slug === slug);

  if (!store) {
    notFound();
  }

  const products = productsData.filter(
    (p) => p.store.toLowerCase() === store.name.toLowerCase()
  );

  const coupons = couponsData.filter(
    (c) => c.store.toLowerCase() === store.name.toLowerCase()
  );

  return (
    <main className="flex-1">
      {/* Store Header */}
      <div className="bg-emerald-50 border-b">
        <div className="container mx-auto px-6 md:px-10 py-12 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-white rounded-xl shadow-sm p-4 mb-4 flex items-center justify-center">
            <div className="relative w-full h-full">
              <Image
                src={store.logo}
                alt={store.name}
                fill
                className="object-contain"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {store.name} Coupons & Deals
          </h1>
          <p className="text-gray-500 max-w-lg">
            Save big at {store.name} with our verified promo codes and latest
            product deals.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-10 py-12">
        {/* Coupons Section */}
        <div className="mb-16">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Active Coupons for {store.name}
          </h2>
          {coupons.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {coupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No coupons available right now.
            </p>
          )}
        </div>

        {/* Products Section */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Top Deals from {store.name}
          </h2>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No deals found for this store.</p>
          )}
        </div>
      </div>
    </main>
  );
}
