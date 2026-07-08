"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useBag } from "@/lib/bag-context";

const SIZES = ["XS", "S", "M", "L", "XL"];

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [size, setSize] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const { addToBag } = useBag();

  function handleAddToBag() {
    if (!size) return;
    addToBag(product, size);
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 2000);
  }

  return (
    <div>
      <fieldset>
        <legend className="text-sm text-navy/60">Size</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              aria-pressed={size === s}
              className={`h-11 w-11 rounded-sm border text-sm transition-colors ${
                size === s
                  ? "border-navy bg-navy text-cream"
                  : "border-navy/20 text-navy hover:border-navy/50"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={handleAddToBag}
        disabled={!size}
        className="mt-6 w-full rounded-sm bg-brass px-6 py-3.5 text-sm font-medium uppercase tracking-wide text-navy transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {confirmed ? "Added to Bag" : "Add to Bag"}
      </button>
      {!size && <p className="mt-2 text-xs text-navy/50">Select a size to add to bag.</p>}
    </div>
  );
}
