import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Tag, Users, Globe, ShieldCheck } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-emerald-50 py-20 text-center px-4">
          <div className="container mx-auto max-w-3xl">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About Afonja Deals</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We are Nigeria's premier destination for finding the best deals, coupons, and discounts. 
              Our mission is to help you save money on everything you buy.
            </p>
          </div>
        </section>

        {/* Mission / Values */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Tag className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Best Deals</h3>
                <p className="text-gray-500">
                  We scour the internet daily to bring you verified coupons and price drops from your favorite stores.
                </p>
              </div>
              
              <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
                <p className="text-gray-500">
                  Built for Nigerians, by Nigerians. We understand the local market and what you value most.
                </p>
              </div>

              <div className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheck className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Trusted & Verified</h3>
                <p className="text-gray-500">
                  No fake codes. We verify every deal to ensure it works when you need it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="container mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg mx-auto text-gray-600">
              <p className="mb-4">
                Founded in 2024, Afonja Deals started with a simple idea: shopping online in Nigeria shouldn't be expensive. 
                With the rising cost of living, finding a good bargain isn't just a luxury—it's a necessity.
              </p>
              <p className="mb-4">
                We noticed that while there were many global coupon sites, few catered specifically to the Nigerian market 
                and the unique stores we shop at, like Jumia, Konga, and local vendors on AliExpress.
              </p>
              <p>
                Today, we help thousands of shoppers save millions of Naira every month. We're just getting started.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
