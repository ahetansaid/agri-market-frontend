import Link from "next/link";
import { Sprout, Leaf, Package, Truck, Tag, Sparkles, Store, ArrowUpRight } from "lucide-react";
import type { Category } from "@/lib/api";

const ICONS = [Sprout, Leaf, Package, Truck, Tag, Sparkles, Store];
const TONES = [
  "from-harvest-500 to-harvest-600",
  "from-brand-500 to-brand-600",
  "from-harvest-600 to-harvest-700",
  "from-brand-400 to-brand-500",
  "from-harvest-500 to-harvest-700",
  "from-brand-500 to-brand-700",
  "from-harvest-400 to-harvest-600",
];

export function CategoryGrid({ categories }: { categories: Category[] }) {
  if (!categories.length) return null;

  return (
    <section className="bg-sand-50 py-14">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-7 flex items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-harvest-700">
              Parcourir le catalogue
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Toutes les{" "}
              <em className="text-gradient-brand font-normal italic">filières</em>
            </h2>
          </div>
          <Link
            href="/filieres"
            className="hidden text-sm font-semibold text-brand-700 hover:underline sm:inline"
          >
            Voir toutes les filières →
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = ICONS[i % ICONS.length];
            const tone = TONES[i % TONES.length];
            return (
              <Link
                key={cat.id}
                href={`/annonces?category=${cat.id}`}
                className="group relative flex items-center gap-3 overflow-hidden rounded-2xl border border-border bg-card p-4 transition hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-black/5"
              >
                <span
                  className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-white shadow-sm ${tone}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold leading-tight text-foreground">
                    {cat.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {cat.annonces_count} annonce{cat.annonces_count > 1 ? "s" : ""}
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground/40 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
