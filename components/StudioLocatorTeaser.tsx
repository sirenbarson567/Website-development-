import Image from "next/image";
import Link from "next/link";
import { getAllStudios } from "@/lib/studios";

export function StudioLocatorTeaser() {
  const [studio] = getAllStudios();
  if (!studio) return null;

  return (
    <section className="bg-navy text-cream">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm lg:order-2">
          <Image
            src={studio.retailImage.src}
            alt={studio.retailImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="lg:order-1">
          <p className="text-sm uppercase tracking-wider text-brass">Shop where you train</p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">{studio.name}</h2>
          <p className="mt-4 max-w-md text-cream/75">{studio.description}</p>
          <p className="mt-6 text-sm text-cream/60">{studio.address}</p>
          <Link
            href="/studios"
            className="mt-8 inline-block rounded-sm border border-cream/40 px-5 py-2.5 text-sm transition-colors hover:border-brass hover:text-brass"
          >
            Find the studio
          </Link>
        </div>
      </div>
    </section>
  );
}
