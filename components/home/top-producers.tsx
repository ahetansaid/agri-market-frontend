import Link from "next/link";
import Image from "next/image";
import { Star, BadgeCheck } from "lucide-react";
import type { Announcement, Seller } from "@/lib/api";

export function TopProducers({ items }: { items: Announcement[] }) {
  // Dédoublonne les vendeurs à partir des annonces, garde les mieux notés
  const map = new Map<number, Seller>();
  for (const a of items) {
    if (a.seller && !map.has(a.seller.id)) map.set(a.seller.id, a.seller);
  }
  const producers = [...map.values()]
    .sort((x, y) => (y.rating_avg ?? 0) - (x.rating_avg ?? 0))
    .slice(0, 10);

  if (producers.length < 3) return null;

  return (
    <section className="py-10">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-6 flex items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-harvest-700">
              Vendeurs vérifiés
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Producteurs{" "}
              <em className="text-gradient-brand font-normal italic">à la une</em>
            </h2>
          </div>
          <Link
            href="/producteurs"
            className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline"
          >
            Tous les producteurs →
          </Link>
        </header>

        <div className="flex gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {producers.map((p) => {
            const name = p.display_name || p.username;
            return (
              <Link
                key={p.id}
                href={`/annonces?user=${p.id}`}
                className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center"
              >
                <div className="relative">
                  <div className="relative grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-harvest-100 to-brand-100 ring-2 ring-border transition group-hover:ring-brand-400">
                    {p.picture ? (
                      <Image
                        src={p.picture}
                        alt={name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : (
                      <span className="font-display text-2xl font-bold text-brand-700">
                        {name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  {p.country_code && (
                    <span
                      className={`fi fi-${p.country_code.toLowerCase()} absolute -bottom-0.5 -right-0.5 h-6 w-6 rounded-full ring-2 ring-card`}
                    />
                  )}
                  <span className="absolute -left-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-harvest-500 text-white shadow">
                    <BadgeCheck className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </span>
                </div>
                <div className="w-full">
                  <div className="truncate text-xs font-semibold text-foreground">
                    {name}
                  </div>
                  {p.ratings_count > 0 ? (
                    <div className="flex items-center justify-center gap-0.5 text-[11px] text-muted-foreground">
                      <Star className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                      {p.rating_avg}
                    </div>
                  ) : (
                    <div className="text-[11px] text-muted-foreground">Nouveau</div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
