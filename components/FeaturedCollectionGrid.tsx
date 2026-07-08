import Link from "next/link";
import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function FeaturedCollectionGrid() {
  const products = getFeaturedProducts(4);

  return (
    <section className="mx-auto max-w-content px-4 py-20 sm:px-6 lg:px-10">
      <div className="flex items-end justify-between gap-4">
        <h2 className="font-serif text-3xl text-navy sm:text-4xl">The Collection</h2>
        <Link
          href="/collection"
          className="whitespace-nowrap text-sm text-navy underline underline-offset-4 hover:text-brass"
        >
          View all
        </Link>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
