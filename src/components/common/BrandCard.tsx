import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Brand } from "@/types";

interface BrandCardProps {
  brand: Brand;
}

export function BrandCard({ brand }: BrandCardProps) {
  return (
    <Link href={`/brands/${brand.slug}`}>
      <Card className="flex items-center justify-center hover:shadow-md transition-all hover:border-emerald-200 aspect-3/2">
        <div className="relative w-full h-full">
          <Image
            src={brand.logo}
            alt={brand.name}
            fill
            className="object-contain p-2 grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
          />
        </div>
      </Card>
    </Link>
  );
}
