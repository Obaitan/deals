"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CouponCard } from "@/components/common/CouponCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import couponsData from "@/data/coupons.json";
import { useState } from "react";

export default function CouponsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredCoupons = couponsData.filter(coupon => 
    coupon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    coupon.store.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">All Coupons & Promo Codes</h1>
            <p className="text-gray-500 mb-8">
              Browse our collection of verified coupons from top Nigerian and international stores.
            </p>
            
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search by store or offer..." 
                className="pl-10 h-12 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredCoupons.map((coupon) => (
              <CouponCard key={coupon.id} coupon={coupon as any} />
            ))}
          </div>
          
          {filteredCoupons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No coupons found matching your search.</p>
              <Button 
                variant="link" 
                onClick={() => setSearchTerm("")}
                className="text-emerald-600"
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
