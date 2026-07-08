const ITEMS = [
  "Reformer-tested fit",
  "Dubai flagship on studio floor",
  "Cream, Brown, Navy, Sage",
];

export function BrandStrip() {
  return (
    <div className="border-y border-navy/10 bg-oak/10">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-center gap-x-10 gap-y-2 px-4 py-4 text-center text-xs uppercase tracking-wider text-navy/70 sm:px-6 lg:px-10">
        {ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </div>
  );
}
