"use client";

import { useState } from "react";
import { SlidersHorizontal, X, Truck, DollarSign, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductFilterOptions {
  shipping: string[];
  priceRange: [number, number];
  discountMin: number;
  brands: string[];
}

interface ProductFiltersProps {
  filters: ProductFilterOptions;
  onFiltersChange: (filters: ProductFilterOptions) => void;
  availableBrands: string[];
}

export function ProductFilters({
  filters,
  onFiltersChange,
  availableBrands,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const shippingOptions = [
    { id: "free", label: "Free Shipping" },
    { id: "express", label: "Express Delivery" },
    { id: "standard", label: "Standard Shipping" },
  ];

  const discountOptions = [
    { value: 0, label: "All Discounts" },
    { value: 10, label: "10% or more" },
    { value: 20, label: "20% or more" },
    { value: 30, label: "30% or more" },
    { value: 50, label: "50% or more" },
  ];

  const handleShippingToggle = (shippingId: string) => {
    const newShipping = filters.shipping.includes(shippingId)
      ? filters.shipping.filter((s) => s !== shippingId)
      : [...filters.shipping, shippingId];
    onFiltersChange({ ...filters, shipping: newShipping });
  };

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onFiltersChange({ ...filters, brands: newBrands });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      shipping: [],
      priceRange: [0, 1000000],
      discountMin: 0,
      brands: [],
    });
  };

  const hasActiveFilters =
    filters.shipping.length > 0 ||
    filters.discountMin > 0 ||
    filters.brands.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {filters.shipping.length +
                filters.brands.length +
                (filters.discountMin > 0 ? 1 : 0)}{" "}
              active
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-sm"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="lg:hidden"
          >
            {isExpanded ? "Hide" : "Show"}
          </Button>
        </div>
      </div>

      {/* Filter Options */}
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4",
          !isExpanded && "hidden lg:grid"
        )}
      >
        {/* Shipping Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Truck className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Shipping
            </label>
          </div>
          <div className="space-y-2">
            {shippingOptions.map((option) => (
              <label
                key={option.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.shipping.includes(option.id)}
                  onChange={() => handleShippingToggle(option.id)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">{option.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Discount Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Discount
            </label>
          </div>
          <select
            value={filters.discountMin}
            onChange={(e) =>
              onFiltersChange({
                ...filters,
                discountMin: Number(e.target.value),
              })
            }
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            {discountOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <DollarSign className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Price Range
            </label>
          </div>
          <div className="space-y-2">
            <input
              type="range"
              min="0"
              max="1000000"
              step="10000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                onFiltersChange({
                  ...filters,
                  priceRange: [0, Number(e.target.value)],
                })
              }
              className="w-full"
            />
            <p className="text-sm text-gray-600">
              Up to ₦{filters.priceRange[1].toLocaleString()}
            </p>
          </div>
        </div>

        {/* Brand Filter */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">Brands</label>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {availableBrands.slice(0, 5).map((brand) => (
              <label
                key={brand}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
