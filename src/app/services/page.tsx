"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  ServiceFilters,
  ServiceFilterOptions,
} from "@/components/common/ServiceFilters";
import { CategorySidebar } from "@/components/common/CategorySidebar";

// Service categories from MegaMenu
const serviceCategories = [
  { slug: "flights", name: "Flights", image: "" },
  { slug: "hotels", name: "Hotels", image: "" },
  { slug: "domains-web-hosting", name: "Domains & Web Hosting", image: "" },
  { slug: "vpn", name: "VPN", image: "" },
];

// Mock service data (to be replaced with actual data later)
const mockServices = [
  {
    id: 1,
    name: "ExpressVPN - 1 Year Subscription",
    price: 45000,
    oldPrice: 60000,
    discount: 25,
    category: "VPN",
    provider: "ExpressVPN",
    description: "Ultra-fast VPN with 3000+ servers worldwide",
  },
  {
    id: 2,
    name: "Namecheap - .com Domain",
    price: 5500,
    oldPrice: 8000,
    discount: 31,
    category: "Domains & Web Hosting",
    provider: "Namecheap",
    description: "Register your .com domain for 1 year",
  },
  {
    id: 3,
    name: "Booking.com - Hotel Stay in Lagos",
    price: 25000,
    oldPrice: 35000,
    discount: 29,
    category: "Hotels",
    provider: "Booking.com",
    description: "3-star hotel, 2 nights with breakfast",
  },
  {
    id: 4,
    name: "Skyscanner - Round Trip Flight",
    price: 180000,
    oldPrice: 250000,
    discount: 28,
    category: "Flights",
    provider: "Skyscanner",
    description: "Lagos to London, Economy class",
  },
];

export default function ServicesPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    categoryParam
  );
  const [filters, setFilters] = useState<ServiceFilterOptions>({
    priceRange: [0, 500000],
    providers: [],
  });

  // Update selected category when URL changes
  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  // Filter services based on category and filters
  const filteredServices = mockServices.filter((service) => {
    // Category filter
    if (selectedCategory) {
      const category = serviceCategories.find(
        (c) => c.slug === selectedCategory
      );
      if (category && service.category !== category.name) {
        return false;
      }
    }

    // Price filter
    if (service.price > filters.priceRange[1]) {
      return false;
    }

    // Provider filter
    if (
      filters.providers.length > 0 &&
      !filters.providers.includes(service.provider)
    ) {
      return false;
    }

    return true;
  });

  // Get available providers
  const availableProviders = Array.from(
    new Set(mockServices.map((s) => s.provider))
  );

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-6 md:px-10 py-8">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Services</h1>
          <p className="text-gray-600">
            Find the best deals on travel, hosting, VPN and more
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content Area */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Filters */}
            <ServiceFilters
              filters={filters}
              onFiltersChange={setFilters}
              availableProviders={availableProviders}
            />

            {/* Service Grid */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {filteredServices.length} service
                {filteredServices.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredServices.map((service) => (
                  <Card
                    key={service.id}
                    className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-100"
                  >
                    <div className="relative h-32 bg-gradient-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
                      <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-0">
                        -{service.discount}%
                      </Badge>
                      <div className="text-4xl">🎯</div>
                    </div>

                    <CardContent className="p-4">
                      <div className="text-xs text-gray-500 mb-1">
                        {service.category}
                      </div>
                      <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
                        {service.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                        {service.description}
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-emerald-700">
                          ₦{service.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₦{service.oldPrice.toLocaleString()}
                        </span>
                      </div>
                    </CardContent>

                    <CardFooter className="p-4 pt-0">
                      <Button
                        asChild
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Link href={`/service/${service.id}`}>
                          View Deal <ExternalLink className="ml-2 h-3 w-3" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 text-lg">No services found</p>
                <p className="text-gray-400 text-sm mt-2">
                  Try adjusting your filters or select a different category
                </p>
              </div>
            )}
          </div>

          {/* Category Sidebar (Right) */}
          <aside className="lg:w-64 order-1 lg:order-2">
            <CategorySidebar
              categories={serviceCategories}
              selectedCategory={selectedCategory}
              categoryUrlBase="/services"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
