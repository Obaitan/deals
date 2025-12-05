"use client";

import Link from "next/link";
import {
  Search,
  Menu,
  ShoppingBag,
  Tag,
  Store,
  Layers,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/todays-deals", label: "Today's Deals", icon: Calendar },
    { href: "/categories", label: "Categories", icon: Layers },
    { href: "/brands", label: "Brands", icon: Tag },
    { href: "/stores", label: "Stores", icon: Store },
    { href: "/coupons", label: "Coupons", icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-6 md:px-10 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl text-emerald-700 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/brand/logo.svg"
            alt="Afonja Deals"
            width={160}
            height={40}
            className="mr-2"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors flex items-center gap-1.5",
                  isActive
                    ? "text-emerald-600 font-semibold"
                    : "hover:text-emerald-600"
                )}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Search Bar (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-xs relative">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search products, brands, coupons..."
              className="w-full pl-9 bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-500 transition-all rounded-full"
            />
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex lg:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-gray-600"
          >
            <Search className="h-5 w-5" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-gray-600">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetTitle className="text-left mb-4">Menu</SheetTitle>
              <nav className="flex flex-col gap-4 mt-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 text-lg font-medium text-gray-600 hover:text-emerald-600 p-2 rounded-md hover:bg-emerald-50 transition-all"
                  >
                    <link.icon className="h-5 w-5" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Expandable */}
      {isSearchOpen && (
        <div className="lg:hidden border-t p-4 bg-white animate-in slide-in-from-top-2">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full pl-10 bg-gray-50 rounded-full"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
