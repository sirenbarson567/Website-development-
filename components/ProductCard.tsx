import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { ColorSwatch } from "./ColorSwatch";

export function ProductCard({ product }: { product: Product }) {
  const [front, angle] = product.images;

  return (
    <Link
      href={`/collection/${product.slug}`}
      className="group block focus-visible:outline-none"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-navy/5">
        <Image
          src={front.src}
          alt={front.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-opacity duration-500 ease-out group-hover:opacity-0"
        />
        {angle && (
          <Image
            src={angle.src}
            alt={angle.alt}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
          />
        )}
        {product.isNew && (
          <span className="absolute left-3 top-3 rounded-full bg-brass px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-cream">
            New
          </span>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-serif text-lg leading-tight text-navy group-hover:underline">
            {product.name}
          </h3>
          <p className="mt-0.5 text-sm text-navy/60">{product.spec}</p>
        </div>
        <p className="whitespace-nowrap font-sans text-sm text-navy">
          AED {product.price.toLocaleString()}
        </p>
      </div>
      <div className="mt-2 flex gap-1.5">
        {product.colors.map((color) => (
          <ColorSwatch key={color} color={color} />
        ))}
      </div>
    </Link>
  );
}
