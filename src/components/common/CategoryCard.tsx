import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Category } from "@/types";

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="overflow-hidden group hover:shadow-md transition-all border-0 bg-gray-50">
        <div className="relative h-24 w-full overflow-hidden">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 text-white font-semibold text-lg">
            {category.name}
          </div>
        </div>
      </Card>
    </Link>
  );
}
