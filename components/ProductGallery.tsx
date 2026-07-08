"use client";

import Image from "next/image";
import { useState } from "react";
import type { ProductImage } from "@/lib/types";

export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      <div className="flex shrink-0 gap-3 overflow-x-auto sm:flex-col sm:overflow-visible">
        {images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`Show ${image.alt}`}
            aria-pressed={index === activeIndex}
            className={`relative aspect-[3/4] w-16 shrink-0 overflow-hidden rounded-sm border transition-colors sm:w-20 ${
              index === activeIndex ? "border-navy" : "border-navy/15 hover:border-navy/40"
            }`}
          >
            <Image src={image.src} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="relative aspect-[3/4] w-full flex-1 overflow-hidden rounded-sm bg-navy/5">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
}
