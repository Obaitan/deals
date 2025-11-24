import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import storesData from "@/data/stores.json";

export default function StoresIndexPage() {
  return (
    <main className="flex-1 py-12">
      <div className="container mx-auto px-6 md:px-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          All Stores
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {storesData.map((store) => (
            <Link key={store.slug} href={`/stores/${store.slug}`}>
              <Card className="p-6 flex flex-col items-center justify-center hover:shadow-md transition-all hover:border-emerald-200 aspect-square">
                <div className="relative w-full h-24 mb-4">
                  <Image
                    src={store.logo}
                    alt={store.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-semibold text-gray-900">
                  {store.name}
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
