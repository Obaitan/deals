"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  ShoppingBag,
  Briefcase,
  Store,
  Star,
  ChevronRight,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Import data
import categoriesData from "@/data/categories.json";
import brandsData from "@/data/brands.json";
import storesData from "@/data/stores.json";
import productsData from "@/data/products.json";

// Types
interface Category {
  slug: string;
  name: string;
  image: string;
}

interface Brand {
  slug: string;
  name: string;
  logo: string;
}

interface StoreItem {
  slug: string;
  name: string;
  logo: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  brand: string;
  category: string;
  store: string;
  image: string;
  expiry: string;
}

// Max items per column
const MAX_ITEMS = 10;

// Service categories
const serviceCategories: Category[] = [
  { slug: "flights", name: "Flights", image: "" },
  { slug: "hotels", name: "Hotels", image: "" },
  { slug: "domains-web-hosting", name: "Domains & Web Hosting", image: "" },
  { slug: "vpn", name: "VPN", image: "" },
];

// ============================================
// ALL DEALS MEGA MENU
// ============================================

type AllDealsMenuType = "products" | "services" | "coupons";

export function AllDealsMegaMenu({ isActive }: { isActive?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<AllDealsMenuType>("products");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categoriesData[0]?.slug || ""
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      // Reset to defaults when closing
      setSelectedType("products");
      setSelectedCategory(categoriesData[0]?.slug || "");
    }, 150);
  };

  // Get categories based on type
  const categories =
    selectedType === "services"
      ? serviceCategories
      : (categoriesData.slice(0, MAX_ITEMS) as Category[]);

  // Get products filtered by category
  const getFilteredProducts = () => {
    let filtered = productsData as Product[];

    if (selectedCategory) {
      const categoryName = categories.find(
        (c) => c.slug === selectedCategory
      )?.name;
      if (categoryName) {
        filtered = filtered.filter((p) => p.category === categoryName);
      }
    }

    return filtered.slice(0, MAX_ITEMS);
  };

  const filteredProducts = getFilteredProducts();

  const menuOptions = [
    {
      id: "products" as const,
      label: "Products",
      icon: <ShoppingBag className="h-4 w-4" />,
    },
    {
      id: "services" as const,
      label: "Services",
      icon: <Briefcase className="h-4 w-4" />,
    },
    {
      id: "coupons" as const,
      label: "Coupons",
      icon: <Ticket className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger - Button only, no navigation */}
      <button
        className={cn(
          "transition-colors flex items-center gap-1",
          isActive ? "text-emerald-600 font-semibold" : "hover:text-emerald-600"
        )}
      >
        All Deals
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Panel - Responsive: 2 cols mobile, 3 cols tablet+ */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50",
          "transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-[400px] lg:w-[720px]">
          {/* Gradient accent bar */}
          <div className="h-1 bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-500" />

          <div className="flex">
            {/* Column 1: Menu Type */}
            <div className="w-40 lg:w-48 bg-gray-50 p-3 lg:p-4 border-r border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Browse By
              </h3>
              <ul className="space-y-1">
                {menuOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      onClick={() => setSelectedType(option.id)}
                      onMouseEnter={() => setSelectedType(option.id)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        selectedType === option.id
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {option.icon}
                      {option.label}
                      <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Categories */}
            <div className="flex-1 lg:w-56 lg:flex-none p-3 lg:p-4 lg:border-r border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/categories/${category.slug}?type=${selectedType}`}
                      onMouseEnter={() => setSelectedCategory(category.slug)}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                        selectedCategory === category.slug
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      <span className="truncate">{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Products/Services - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block flex-1 p-4 min-w-[240px]">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {selectedType === "services"
                  ? "Services"
                  : selectedType === "coupons"
                  ? "Coupons"
                  : "Products"}
              </h3>
              {filteredProducts.length > 0 ? (
                <ul className="space-y-1">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <span className="shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                          {product.discount}%
                        </span>
                        <span className="truncate">{product.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 px-3 py-2">
                  No items in this category
                </p>
              )}

              {/* View All Products/Services Link */}
              <Link
                href={
                  selectedType === "services"
                    ? "/all-deals?type=services"
                    : selectedType === "coupons"
                    ? "/coupons"
                    : "/all-deals?type=products"
                }
                className="mt-4 flex items-center gap-1 px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {selectedType === "services"
                  ? "All Services"
                  : selectedType === "coupons"
                  ? "All Coupons"
                  : "All Products"}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// BRANDS & STORES MEGA MENU
// ============================================

type BrandsStoresMenuType = "brands" | "stores";

export function BrandsStoresMegaMenu({ isActive }: { isActive?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] =
    useState<BrandsStoresMenuType>("brands");
  const [selectedItem, setSelectedItem] = useState<string>(
    brandsData[0]?.slug || ""
  );
  const [selectedItemType, setSelectedItemType] = useState<"brand" | "store">(
    "brand"
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      // Reset to defaults
      setSelectedType("brands");
      setSelectedItem(brandsData[0]?.slug || "");
      setSelectedItemType("brand");
    }, 150);
  };

  // Get list items based on type
  const getListItems = () => {
    switch (selectedType) {
      case "brands":
        return (brandsData as Brand[])
          .slice(0, MAX_ITEMS)
          .map((b) => ({ ...b, type: "brand" as const }));
      case "stores":
        return (storesData as StoreItem[])
          .slice(0, MAX_ITEMS)
          .map((s) => ({ ...s, type: "store" as const }));
      default:
        return (brandsData as Brand[])
          .slice(0, MAX_ITEMS)
          .map((b) => ({ ...b, type: "brand" as const }));
    }
  };

  const listItems = getListItems();

  // Get products filtered by brand or store
  const getFilteredProducts = () => {
    const products = productsData as Product[];
    const itemName = listItems.find((i) => i.slug === selectedItem)?.name;

    if (!itemName) return products.slice(0, MAX_ITEMS);

    if (selectedItemType === "brand") {
      return products.filter((p) => p.brand === itemName).slice(0, MAX_ITEMS);
    } else {
      return products.filter((p) => p.store === itemName).slice(0, MAX_ITEMS);
    }
  };

  const filteredProducts = getFilteredProducts();

  const menuOptions = [
    {
      id: "brands" as const,
      label: "Brands",
      icon: <Star className="h-4 w-4" />,
    },
    {
      id: "stores" as const,
      label: "Stores",
      icon: <Store className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger - Button only, no navigation */}
      <button
        className={cn(
          "transition-colors flex items-center gap-1",
          isActive ? "text-emerald-600 font-semibold" : "hover:text-emerald-600"
        )}
      >
        Brands & Stores
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Dropdown Panel - Responsive: 2 cols mobile, 3 cols tablet+ */}
      <div
        className={cn(
          "absolute left-1/2 -translate-x-1/2 top-full pt-4 z-50",
          "transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        )}
      >
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden w-[400px] lg:w-[720px]">
          {/* Gradient accent bar - Same as All Deals (emerald) */}
          <div className="h-1 bg-linear-to-r from-emerald-400 via-teal-500 to-cyan-500" />

          <div className="flex">
            {/* Column 1: Menu Type */}
            <div className="w-40 lg:w-48 bg-gray-50 p-3 lg:p-4 border-r border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Browse By
              </h3>
              <ul className="space-y-1">
                {menuOptions.map((option) => (
                  <li key={option.id}>
                    <button
                      onClick={() => {
                        setSelectedType(option.id);
                        // Reset selected item based on type
                        if (option.id === "stores") {
                          setSelectedItem(storesData[0]?.slug || "");
                          setSelectedItemType("store");
                        } else {
                          setSelectedItem(brandsData[0]?.slug || "");
                          setSelectedItemType("brand");
                        }
                      }}
                      onMouseEnter={() => {
                        setSelectedType(option.id);
                        if (option.id === "stores") {
                          setSelectedItem(storesData[0]?.slug || "");
                          setSelectedItemType("store");
                        } else {
                          setSelectedItem(brandsData[0]?.slug || "");
                          setSelectedItemType("brand");
                        }
                      }}
                      className={cn(
                        "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        selectedType === option.id
                          ? "bg-emerald-100 text-emerald-700"
                          : "text-gray-600 hover:bg-gray-100"
                      )}
                    >
                      {option.icon}
                      {option.label}
                      <ChevronRight className="h-4 w-4 ml-auto opacity-50" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Brands/Stores List - No scroll, fits content */}
            <div className="flex-1 lg:w-56 lg:flex-none p-3 lg:p-4 lg:border-r border-gray-100">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {selectedType === "stores" ? "Stores" : "Brands"}
              </h3>
              <ul className="space-y-1">
                {listItems.map((item) => (
                  <li key={`${item.type}-${item.slug}`}>
                    <Link
                      href={
                        item.type === "brand"
                          ? `/brands-and-stores/${item.slug}`
                          : `/stores/${item.slug}`
                      }
                      onMouseEnter={() => {
                        setSelectedItem(item.slug);
                        setSelectedItemType(item.type);
                      }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left",
                        selectedItem === item.slug
                          ? "bg-emerald-50 text-emerald-700 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                      )}
                    >
                      {/* Brand/Store Logo */}
                      <span className="shrink-0 size-5 overflow-hidden flex items-center justify-center">
                        <Image
                          src={item.logo}
                          alt={item.name}
                          width={200}
                          height={200}
                          className="w-full h-full object-contain"
                        />
                      </span>
                      <span className="truncate">{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>

              {/* All Brands/Stores Link */}
              <Link
                href={
                  selectedType === "stores" ? "/stores" : "/brands-and-stores"
                }
                className="mt-3 flex items-center gap-1 px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                {selectedType === "stores" ? "All Stores" : "All Brands"}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Column 3: Products - Hidden on mobile, visible on lg+ */}
            <div className="hidden lg:block flex-1 p-4 min-w-[240px]">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Available Deals
              </h3>
              {filteredProducts.length > 0 ? (
                <ul className="space-y-1">
                  {filteredProducts.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/product/${product.id}`}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
                      >
                        <span className="shrink-0 w-6 h-6 rounded bg-gray-100 flex items-center justify-center text-xs font-medium text-gray-500">
                          {product.discount}%
                        </span>
                        <span className="truncate">{product.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 px-3 py-2">
                  No deals available
                </p>
              )}

              {/* View All Link */}
              <Link
                href={
                  selectedItemType === "brand"
                    ? `/brands-and-stores/${selectedItem}`
                    : `/stores/${selectedItem}`
                }
                className="mt-4 flex items-center gap-1 px-3 py-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                View all deals
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
