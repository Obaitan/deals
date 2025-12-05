import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface Service {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  discount: number;
  category: string;
  provider: string;
  description: string;
}

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white overflow-hidden group hover:shadow-lg transition-all duration-300 border-gray-100 rounded-md shadow-sm">
      <div className="relative h-32 bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white border-0">
          -{service.discount}%
        </Badge>
        <div className="text-4xl">🎯</div>
      </div>

      <div className="px-4 pt-4 pb-2.5">
        <div className="text-xs text-gray-500 flex gap-4 justify-between item-end mb-1">
          <span>{service.category}</span>
          <Link
            href={`/services/${service.id}`}
            className="text-emerald-700 text-[13px] inline-flex items-center gap-1 hover:underline transition-all"
          >
            View Deal <ExternalLink className="size-3.5" />
          </Link>
        </div>
        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-emerald-700 transition-colors">
          {service.name}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-1 mb-2">
          {service.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="font-bold text-emerald-700">
            ₦{service.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-400 line-through">
            ₦{service.oldPrice.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
