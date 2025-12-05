import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-100">
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-0">
          -{product.discount}%
        </Badge>
        <Badge variant="secondary" className="absolute top-2 left-2 bg-white/90 backdrop-blur text-gray-700 font-medium">
          {product.store}
        </Badge>
      </div>
      
      <CardContent className="p-4">
        <div className="text-xs text-gray-500 mb-1">{product.category}</div>
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-emerald-700 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-emerald-700">
            ₦{product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₦{product.oldPrice.toLocaleString()}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
          <Link href={`/products/${product.id}`}>
            View Deal <ExternalLink className="ml-2 h-3 w-3" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
