"use client";

import Link from "next/link";
import Image from "next/image";
import { Tag } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function Footer() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61564567153323",
      icon: "facebook",
    },
    {
      name: "X",
      href: "https://www.linkedin.com/company/nubeeka-concepts",
      icon: "X",
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/company/nubeeka-concepts",
      icon: "linkedin",
    },
  ];

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-6 md:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="md:col-span-3 xl:col-span-2 space-y-4">
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
            <div className="w-full xl:w-4/5">
              <p className="text-sm text-gray-500 leading-relaxed">
                Find the best deals, coupons & discounts in Nigeria and beyond.
                We help you save money on your favorite brands.
              </p>
            </div>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center text-gray-400 hover:border-secondary hover:bg-secondary hover:text-white transition-colors"
                  aria-label={link.name}
                >
                  {link.icon === "facebook" && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                    </svg>
                  )}

                  {link.icon === "X" && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )}
                  {link.icon === "linkedin" && (
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  )}
                </Link>
              ))}
            </div>
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
              Get the latest deals delivered to your inbox. Subscribe.
            </p>
            <div className="relative">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-600 w-full"
              />
              <button className="bg-emerald-600 text-white px-4 py-1.5 rounded-sm hover:bg-emerald-700 transition-colors absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-4"
                >
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
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
