import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About — Studio 14",
  description: "The Studio 14 brand story: power in your nature.",
};

export default function AboutPage() {
  return (
    <div>
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-10">
        <p className="text-sm uppercase tracking-wider text-brass">Our Story</p>
        <h1 className="mt-3 font-serif text-4xl leading-tight text-navy sm:text-5xl">
          Power in your nature.
        </h1>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-navy/80">
          <p>
            Studio 14 started on the reformer floor, not in a design studio. Years of watching
            bodies move through controlled, deliberate range taught us that the strongest thing
            a garment can do is disappear once you start moving.
          </p>
          <p>
            The line grew out of that studio: reformer sets built to hold through a full class,
            oversized zip jackets for the walk in and the walk out, and the denim and sneakers
            that carry the same ease into the rest of the day. It reads as one wardrobe, not a
            technical gym capsule bolted onto a lifestyle brand.
          </p>
          <p>
            Every color in the palette, oak, moss, cream, navy, brass, comes directly from the
            studio itself: the wood fixtures, the accent wall, the brass lighting, the arched
            mirror on the retail corner. There is no separate storefront. If you buy it, you
            probably trained a few meters from where it hung.
          </p>
        </div>
      </div>

      <div className="relative aspect-[21/9] w-full">
        <Image
          src="/images/about/philosophy.svg"
          alt="Moss accent wall and arched mirror inside the Studio 14 retail corner"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
