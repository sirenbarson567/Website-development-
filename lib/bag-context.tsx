"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./types";

export interface BagItem {
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;
  quantity: number;
}

interface BagContextValue {
  items: BagItem[];
  count: number;
  addToBag: (product: Product, size: string) => void;
}

const BagContext = createContext<BagContextValue | null>(null);

export function BagProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<BagItem[]>([]);

  const addToBag = useCallback((product: Product, size: string) => {
    setItems((current) => {
      const existing = current.find((item) => item.slug === product.slug && item.size === size);
      if (existing) {
        return current.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...current,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          size,
          image: product.images[0]?.src ?? "",
          quantity: 1,
        },
      ];
    });
  }, []);

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const value = useMemo(() => ({ items, count, addToBag }), [items, count, addToBag]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag(): BagContextValue {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error("useBag must be used within a BagProvider");
  }
  return context;
}
