"use client";

import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <footer className="bg-gray-50 border-t mt-auto">
      <div className="container mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl text-emerald-700"
            >
              <Image
                src="/brand/logo.svg"
                alt="Afonja Deals"
                width={160}
                height={40}
                className="mr-2"
              />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Find the best deals, coupons & discounts in Nigeria and beyond. We
              help you save money on your favorite brands.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Discover</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/categories"
                  className={cn(
                    isActive("/categories")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/brands"
                  className={cn(
                    isActive("/brands")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Brands
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className={cn(
                    isActive("/stores")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Stores
                </Link>
              </li>
              <li>
                <Link
                  href="/coupons"
                  className={cn(
                    isActive("/coupons")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Coupons
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link
                  href="/about"
                  className={cn(
                    isActive("/about")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={cn(
                    isActive("/contact")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={cn(
                    isActive("/terms")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className={cn(
                    isActive("/privacy")
                      ? "text-emerald-600 font-medium"
                      : "hover:text-emerald-600"
                  )}
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (Mock) */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Stay Updated</h3>
            <p className="text-sm text-gray-500 mb-4">
              Get the latest deals delivered to your inbox.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button className="bg-emerald-600 text-white px-4 py-2 text-sm font-medium rounded-md hover:bg-emerald-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Afonja Deals. All rights reserved.</p>
          <p className="mt-2 text-xs">
            *Disclosure: We may earn a commission when you use one of our
            coupons/links to make a purchase.
          </p>
        </div>
      </div>
    </footer>
  );
}
