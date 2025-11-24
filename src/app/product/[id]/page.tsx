import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/common/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, ShoppingCart, ShieldCheck, Truck } from "lucide-react";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";
import Image from "next/image";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = productsData.find((p) => p.id === parseInt(id));
  
  if (!product) {
    notFound();
  }

  const relatedProducts = productsData
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            {/* Image Gallery */}
            <div className="bg-gray-50 rounded-2xl overflow-hidden aspect-square relative">
              <Image 
                src={product.image} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
              <Badge className="absolute top-4 right-4 bg-red-500 text-lg px-3 py-1">
                -{product.discount}%
              </Badge>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                  {product.category}
                </Badge>
                <Badge variant="secondary">
                  {product.brand}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-emerald-700">
                  ₦{product.price.toLocaleString()}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  ₦{product.oldPrice.toLocaleString()}
                </span>
              </div>

              <div className="prose prose-gray mb-8">
                <p>
                  Get this amazing deal on the {product.name} from {product.store}. 
                  Limited time offer available now. High quality, authentic product guaranteed.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-lg h-14 px-8 w-full sm:w-auto">
                  Shop Now at {product.store} <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg h-14 px-8 w-full sm:w-auto">
                  Add to Wishlist
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="h-5 w-5 text-emerald-600" />
                  <span>Verified Deal</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-emerald-600" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShoppingCart className="h-5 w-5 text-emerald-600" />
                  <span>In Stock</span>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Deals</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
