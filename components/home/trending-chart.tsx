import Link from "next/link";
import Image from "next/image";
import { Star, Package, ArrowRight, Flame, Leaf } from "lucide-react";
import type { Announcement } from "@/lib/api";

export function TrendingChart({
  items,
  viewAllHref,
}: {
  items: Announcement[];
  viewAllHref: string;
}) {
  if (items.length < 3) return null;
  const first = items[0];
  const rest = items.slice(1, 6);

  return (
    <section className="bg-sand-50 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-700">
              <Flame className="h-3.5 w-3.5" strokeWidth={2.5} />
              En ce moment
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Le{" "}
              <em className="text-gradient-brand font-normal italic">top des recherches</em>
            </h2>
          </div>
          <Link
            href={viewAllHref}
            className="text-sm font-semibold text-brand-700 hover:underline"
          >
            Voir tout →
          </Link>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          {/* #1 en vedette */}
          <Link
            href={`/annonces/${first.id}`}
            className="group relative flex min-h-[320px] overflow-hidden rounded-3xl ring-1 ring-black/5"
          >
            {first.image_url ? (
              <Image
                src={first.image_url}
                alt={first.title}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-sand-300 to-sand-400">
                <Leaf className="h-20 w-20 text-white/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-sand-900/85 via-sand-900/20 to-transparent" />

            <span className="absolute left-5 top-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 font-display text-2xl font-bold text-white shadow-lg">
              1
            </span>

            <div className="relative z-10 mt-auto w-full p-6 text-white">
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-200">
                {first.category_name}
              </span>
              <h3 className="font-display text-2xl font-semibold leading-tight sm:text-3xl">
                {first.title}
              </h3>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                {first.quantity && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 font-semibold backdrop-blur">
                    <Package className="h-3.5 w-3.5" />
                    {first.quantity.toLocaleString("fr-FR")} {first.unit}
                  </span>
                )}
                {first.seller.ratings_count > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-gold text-gold" strokeWidth={0} />
                    {first.seller.rating_avg} ({first.seller.ratings_count})
                  </span>
                )}
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-white px-4 py-1.5 font-semibold text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
                  Voir <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </div>
            </div>
          </Link>

          {/* Liste #2..#6 */}
          <ol className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
            {rest.map((a, i) => (
              <li key={a.id}>
                <Link
                  href={`/annonces/${a.id}`}
                  className="group flex items-center gap-4 p-3 transition hover:bg-sand-50"
                >
                  <span className="w-6 shrink-0 text-center font-display text-xl font-bold text-sand-300">
                    {i + 2}
                  </span>
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                    {a.image_url && (
                      <Image
                        src={a.image_url}
                        alt={a.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                      {a.category_name}
                    </div>
                    <div className="truncate font-semibold leading-tight text-foreground">
                      {a.title}
                    </div>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      {a.quantity && (
                        <span>
                          {a.quantity.toLocaleString("fr-FR")} {a.unit}
                        </span>
                      )}
                      {a.seller.ratings_count > 0 && (
                        <span className="inline-flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                          {a.seller.rating_avg}
                        </span>
                      )}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition group-hover:translate-x-0.5 group-hover:text-brand-600" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
