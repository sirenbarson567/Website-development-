"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { BrandColor, Product, ProductCategory } from "@/lib/types";
import { ColorSwatch } from "./ColorSwatch";
import { ProductCard } from "./ProductCard";

const CATEGORIES: { value: ProductCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "sets", label: "Sets" },
  { value: "jackets", label: "Jackets" },
  { value: "lifestyle", label: "Lifestyle" },
];

const COLORS: BrandColor[] = ["oak", "moss", "cream", "navy", "brass"];

type Sort = "newest" | "price-asc" | "price-desc";

export function CollectionFilters({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const initialCategory = (searchParams.get("category") as ProductCategory | null) ?? "all";

  const [category, setCategory] = useState<ProductCategory | "all">(initialCategory);
  const [color, setColor] = useState<BrandColor | null>(null);
  const [sort, setSort] = useState<Sort>("newest");

  const filtered = useMemo(() => {
    let result = products;
    if (category !== "all") {
      result = result.filter((product) => product.category === category);
    }
    if (color) {
      result = result.filter((product) => product.colors.includes(color));
    }
    result = [...result].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return result;
  }, [products, category, color, sort]);

  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-navy/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => setCategory(c.value)}
              aria-pressed={category === c.value}
              className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                category === c.value
                  ? "bg-navy text-cream"
                  : "bg-navy/5 text-navy hover:bg-navy/10"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-sm text-navy/60">Color</span>
            <div className="flex gap-1.5">
              {COLORS.map((c) => (
                <ColorSwatch
                  key={c}
                  color={c}
                  size="md"
                  selected={color === c}
                  onClick={() => setColor((current) => (current === c ? null : c))}
                />
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-navy/60">
            Sort
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="rounded-sm border border-navy/20 bg-cream px-2 py-1.5 text-navy focus-visible:outline-brass"
            >
              <option value="newest">Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </label>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-16 text-center text-navy/60">No pieces match those filters yet.</p>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
