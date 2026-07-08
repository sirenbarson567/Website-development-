import Image from "next/image";

export function PhilosophyBlock() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-10">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
          <Image
            src="/images/about/philosophy.svg"
            alt="Moss accent wall and arched mirror inside the Studio 14 retail corner"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-serif text-3xl leading-snug text-navy sm:text-4xl">
            The reformer teaches control before it teaches intensity. We wanted the clothes to
            carry that same instruction.
          </p>
          <p className="mt-6 max-w-md text-navy/70">
            Power in your nature is not a slogan we picked off a mood board. It came out of
            watching hundreds of reformer sessions on the studio floor, watching bodies find a
            kind of strength that has nothing to do with force.
          </p>
        </div>
      </div>
    </section>
  );
}
