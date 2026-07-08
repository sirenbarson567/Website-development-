import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllProducts, getCompleteTheLook, getProductBySlug } from "@/lib/products";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import { ProductCard } from "@/components/ProductCard";
import { BRAND_COLOR_LABEL } from "@/lib/types";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Studio 14`,
    description: product.spec,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const completeTheLook = getCompleteTheLook(product);

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} />

        <div className="max-w-md">
          <h1 className="font-serif text-3xl text-navy sm:text-4xl">{product.name}</h1>
          <p className="mt-2 text-lg text-navy">AED {product.price.toLocaleString()}</p>
          <p className="mt-4 text-navy/70">{product.spec}</p>

          <dl className="mt-8 space-y-3 border-y border-navy/10 py-6 text-sm">
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-navy/50">Colors</dt>
              <dd className="text-navy">
                {product.colors.map((c) => BRAND_COLOR_LABEL[c]).join(", ")}
              </dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-navy/50">Fit</dt>
              <dd className="text-navy">{product.fit}</dd>
            </div>
            <div className="flex gap-4">
              <dt className="w-20 shrink-0 text-navy/50">Fabric</dt>
              <dd className="text-navy">{product.fabric}</dd>
            </div>
          </dl>

          <div className="mt-8">
            <ProductPurchasePanel product={product} />
          </div>
        </div>
      </div>

      {completeTheLook.length > 0 && (
        <section className="mt-24">
          <h2 className="font-serif text-2xl text-navy sm:text-3xl">Complete the Look</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-3">
            {completeTheLook.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
