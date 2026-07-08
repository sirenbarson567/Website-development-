import { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { CollectionFilters } from "@/components/CollectionFilters";

export const metadata: Metadata = {
  title: "Collection — Studio 14",
  description: "Reformer sets, studio zip jackets, and lifestyle pieces from Studio 14.",
};

export default function CollectionPage() {
  const products = getAllProducts();

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-10">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl text-navy sm:text-5xl">Collection</h1>
        <p className="mt-4 text-navy/70">
          Reformer sets, studio zip jackets, and the lifestyle pieces worn around them, all
          tested on our own studio floor before they reach the rail.
        </p>
      </div>

      <div className="mt-10">
        <Suspense fallback={null}>
          <CollectionFilters products={products} />
        </Suspense>
      </div>
    </div>
  );
}
