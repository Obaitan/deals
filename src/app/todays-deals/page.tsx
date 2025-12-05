"use client";

import { CouponCard } from "@/components/common/CouponCard";
import { ProductCard } from "@/components/common/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Clock } from "lucide-react";
import couponsData from "@/data/coupons.json";
import productsData from "@/data/products.json";
import { useState } from "react";

export default function TodaysDealsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter coupons expiring today
  const todaysCoupons = couponsData.filter((coupon) => coupon.expiry === today);

  // Filter products expiring today
  const todaysProducts = productsData.filter(
    (product: any) => product.expiry === today
  );

  // Apply search filter
  const filteredCoupons = todaysCoupons.filter(
    (coupon) =>
      coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.store.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = todaysProducts.filter(
    (product: any) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.store.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const hasDeals = filteredCoupons.length > 0 || filteredProducts.length > 0;

  return (
    <main className="flex-1 py-12 bg-linear-to-b from-emerald-50/30 to-white">
      <div className="container mx-auto px-6 md:px-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <Clock className="h-4 w-4 animate-pulse" />
            Last Day Deals - Expiring Today!
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <Calendar className="h-10 w-10 text-emerald-600" />
            Today's Deals
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            Don't miss out! These amazing deals and coupons expire today. Grab
            them before they're gone!
          </p>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search today's deals..."
              className="pl-12 h-14 text-lg border-2 focus:border-emerald-500 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Coupons Section */}
        {filteredCoupons.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Coupons Expiring Today
              </h2>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                {filteredCoupons.length}{" "}
                {filteredCoupons.length === 1 ? "Coupon" : "Coupons"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredCoupons.map((coupon) => (
                <CouponCard key={coupon.id} coupon={coupon as any} />
              ))}
            </div>
          </div>
        )}

        {/* Products Section */}
        {filteredProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Product Deals Expiring Today
              </h2>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "Product" : "Products"}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredProducts.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasDeals && (
          <div className="text-center py-20">
            <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              {searchTerm ? "No matches found" : "No deals expiring today"}
            </h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              {searchTerm
                ? "Try adjusting your search to find what you're looking for."
                : "Check back tomorrow for new deals, or browse our other pages for current offers."}
            </p>
            {searchTerm && (
              <Button
                variant="link"
                onClick={() => setSearchTerm("")}
                className="text-emerald-600 text-lg"
              >
                Clear Search
              </Button>
            )}
          </div>
        )}

        {/* Call to Action */}
        {hasDeals && (
          <div className="mt-16 bg-linear-to-r from-emerald-600 to-emerald-700 rounded-2xl p-8 md:p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">
              Don't Wait - These Deals Expire Tonight!
            </h3>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl mx-auto">
              All deals on this page will be gone by midnight. Save now and
              enjoy massive discounts before it's too late!
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <Clock className="h-5 w-5 animate-pulse" />
              <span className="font-semibold">Time is running out!</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
