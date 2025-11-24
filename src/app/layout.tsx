import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://afonjadeals.ng/'),
  title: {
    default: 'Best Online Deals, Discounts & Coupon Codes | Save Big Today',
    template: '%s | Shop Smarter with Daily Deals',
  },
  description:
    'Discover the latest and greatest deals, discounts, and promo codes for shopping, travel, web hosting, software, and more. Save money every day!',
  keywords: [
    'coupon codes',
    'discounts',
    'online deals',
    'shopping coupons',
    'travel discounts',
    'web hosting promo',
    'save money',
    'promo codes',
  ],
  openGraph: {
    title: 'Best Online Deals & Promo Codes | Save on Shopping & Travel',
    description:
      'Your one-stop destination for daily deals, discounts, and coupon codes for eCommerce, travel, hosting, and more.',
    url: 'https://afonjadeals.ng/',
    siteName: 'Example Deals',
    images: [
      {
        url: 'https://afonjadeals.ng/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Save with the best daily online deals',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shop Smarter with Daily Deals & Promo Codes',
    description:
      'Find verified coupons and discounts for your favorite products and services.',
    images: ['https://afonjadeals.ng/twitter-card.jpg'],
  },
  icons: {
    icon: '/brand/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
