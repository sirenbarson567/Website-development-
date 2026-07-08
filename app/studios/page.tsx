import type { Metadata } from "next";
import Image from "next/image";
import { getAllStudios } from "@/lib/studios";

export const metadata: Metadata = {
  title: "Studios — Studio 14",
  description: "Find the Studio 14 reformer studio and boutique retail corner.",
};

export default function StudiosPage() {
  const studios = getAllStudios();

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6 lg:px-10">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl text-navy sm:text-5xl">Studios</h1>
        <p className="mt-4 text-navy/70">
          Studio 14 is not a separate storefront. The retail corner sits inside the studio
          itself, so you shop the same rail you pass on your way to class.
        </p>
      </div>

      <div className="mt-12 space-y-20">
        {studios.map((studio) => (
          <article
            key={studio.id}
            className="grid grid-cols-1 gap-10 border-t border-navy/10 pt-12 lg:grid-cols-2 lg:gap-16"
          >
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={studio.image.src}
                  alt={studio.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <Image
                  src={studio.retailImage.src}
                  alt={studio.retailImage.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-navy sm:text-3xl">{studio.name}</h2>
              <p className="mt-4 text-navy/70">{studio.description}</p>

              <div className="mt-8">
                <h3 className="text-sm uppercase tracking-wider text-brass">Address</h3>
                <p className="mt-2 text-navy">{studio.address}</p>
              </div>

              <div className="mt-6">
                <h3 className="text-sm uppercase tracking-wider text-brass">Hours</h3>
                <dl className="mt-2 space-y-1">
                  {studio.hours.map((hour) => (
                    <div key={hour.day} className="flex justify-between gap-4 text-sm text-navy">
                      <dt className="text-navy/60">{hour.day}</dt>
                      <dd>{hour.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="mt-8 aspect-[16/10] overflow-hidden rounded-sm border border-navy/10">
                <iframe
                  title={`Map to ${studio.name}`}
                  src={studio.mapEmbedUrl}
                  className="h-full w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
