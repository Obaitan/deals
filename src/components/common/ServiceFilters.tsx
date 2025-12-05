"use client";

import { useState } from "react";
import { SlidersHorizontal, X, DollarSign, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ServiceFilterOptions {
  priceRange: [number, number];
  providers: string[];
}

interface ServiceFiltersProps {
  filters: ServiceFilterOptions;
  onFiltersChange: (filters: ServiceFilterOptions) => void;
  availableProviders: string[];
}

export function ServiceFilters({
  filters,
  onFiltersChange,
  availableProviders,
}: ServiceFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleProviderToggle = (provider: string) => {
    const newProviders = filters.providers.includes(provider)
      ? filters.providers.filter((p) => p !== provider)
      : [...filters.providers, provider];
    onFiltersChange({ ...filters, providers: newProviders });
  };

  const handleClearFilters = () => {
    onFiltersChange({
      priceRange: [0, 500000],
      providers: [],
    });
  };

  const hasActiveFilters = filters.providers.length > 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 mb-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
          {hasActiveFilters && (
            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
              {filters.providers.length} active
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
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
          !isExpanded && "hidden lg:grid"
        )}
      >
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
              max="500000"
              step="5000"
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

        {/* Provider Filter */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">
              Providers
            </label>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableProviders.slice(0, 6).map((provider) => (
              <label
                key={provider}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters.providers.includes(provider)}
                  onChange={() => handleProviderToggle(provider)}
                  className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-600 truncate">
                  {provider}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
