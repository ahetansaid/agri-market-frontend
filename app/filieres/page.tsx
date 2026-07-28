import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getCategories, type Category } from "@/lib/api";
import { Sprout, ArrowRight, Layers, Leaf, Package } from "lucide-react";

export const metadata = { title: "Filières" };

const ICONS = [Layers, Package, Leaf, Sprout];

export default async function FilieresPage() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  const totalSub = categories.reduce(
    (n, c) => n + (c.subcategories?.length ?? 0),
    0
  );
  const totalAnn = categories.reduce(
    (n, c) => n + (c.annonces_count ?? 0),
    0
  );

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        {/* Hero éditorial */}
        <section className="relative overflow-hidden bg-sand-900 text-white">
          <div className="pointer-events-none absolute -left-24 top-6 h-96 w-96 rounded-full bg-brand-600 opacity-25 blur-[110px]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-harvest-500 opacity-20 blur-[110px]" />
          <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-6 sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300 backdrop-blur">
              <Sprout className="h-3.5 w-3.5" />
              Filières
            </span>
            <h1 className="mt-4 font-display text-[clamp(2rem,6vw,4rem)] font-medium leading-[1.05] tracking-tight">
              Les filières{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-300 via-brand-400 to-harvest-300 bg-clip-text text-transparent">
                agricoles
              </em>
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
              Parcourez les grandes catégories de produits du continent et
              accédez directement aux annonces de chaque filière.
            </p>

            {/* Stats */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <Stat value={categories.length} label="Filières" />
              <Stat value={totalSub} label="Sous-filières" />
              <Stat value={totalAnn} label="Annonces" />
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          {categories.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              Les filières sont momentanément indisponibles.{" "}
              <Link
                href="/annonces"
                className="font-semibold text-brand-700 hover:underline"
              >
                Voir toutes les annonces
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
              {categories.map((c, i) => {
                const Icon = ICONS[i % ICONS.length];
                const green = i % 2 === 1;
                const subs = c.subcategories ?? [];
                return (
                  <Link
                    key={c.id}
                    href={`/annonces?category=${c.id}`}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
                  >
                    <div
                      className={`pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl transition ${
                        green
                          ? "bg-harvest-500/10 group-hover:bg-harvest-500/20"
                          : "bg-brand-500/10 group-hover:bg-brand-500/20"
                      }`}
                    />
                    <div className="relative flex flex-1 flex-col">
                      <div
                        className={`mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl text-white shadow-sm ${
                          green
                            ? "bg-gradient-to-br from-harvest-500 to-harvest-700"
                            : "bg-gradient-to-br from-brand-500 to-brand-700"
                        }`}
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <h2 className="font-display text-lg font-semibold tracking-tight">
                        {c.name}
                      </h2>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {subs.length} sous-filière{subs.length > 1 ? "s" : ""}
                        {typeof c.annonces_count === "number"
                          ? ` · ${c.annonces_count} annonce${c.annonces_count > 1 ? "s" : ""}`
                          : ""}
                      </p>

                      {subs.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-1.5">
                          {subs.slice(0, 4).map((s) => (
                            <span
                              key={s.id}
                              className="rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-foreground/70"
                            >
                              {s.name}
                            </span>
                          ))}
                          {subs.length > 4 && (
                            <span className="rounded-full bg-sand-100 px-2.5 py-1 text-[11px] font-medium text-muted-foreground">
                              +{subs.length - 4}
                            </span>
                          )}
                        </div>
                      )}

                      <div
                        className={`mt-5 inline-flex items-center gap-1 pt-1 text-xs font-semibold transition group-hover:gap-2 ${
                          green ? "text-harvest-700" : "text-brand-700"
                        }`}
                      >
                        Voir les annonces
                        <ArrowRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

function Stat({ value, label }: { value: number; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl font-bold leading-none tracking-tight sm:text-4xl">
        {value.toLocaleString("fr-FR")}
      </div>
      <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}
