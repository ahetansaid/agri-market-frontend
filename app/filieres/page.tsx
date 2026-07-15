import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getCategories, type Category } from "@/lib/api";
import { Sprout, ArrowRight, Layers } from "lucide-react";

export const metadata = { title: "Filières" };

export default async function FilieresPage() {
  let categories: Category[] = [];
  try {
    categories = await getCategories();
  } catch {
    categories = [];
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <header className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700">
              <Sprout className="h-3.5 w-3.5" />
              Filières
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Les filières{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                agricoles
              </em>
            </h1>
            <p className="mt-3 text-muted-foreground">
              Parcourez les grandes catégories de produits de la marketplace et
              trouvez les annonces qui vous intéressent.
            </p>
          </header>

          {categories.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              Les filières sont momentanément indisponibles.{" "}
              <Link href="/annonces" className="font-semibold text-brand-700 hover:underline">
                Voir toutes les annonces
              </Link>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href="/annonces"
                  className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:border-brand-300"
                >
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-500/8 blur-2xl transition group-hover:bg-brand-500/15" />
                  <div className="relative">
                    <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700">
                      <Layers className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <h2 className="font-display text-lg font-semibold tracking-tight">
                      {c.name}
                    </h2>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {c.subcategories.length} sous-filière
                      {c.subcategories.length > 1 ? "s" : ""}
                      {typeof c.annonces_count === "number"
                        ? ` · ${c.annonces_count} annonce${c.annonces_count > 1 ? "s" : ""}`
                        : ""}
                    </p>
                    <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 transition group-hover:gap-2">
                      Voir les annonces
                      <ArrowRight className="h-3 w-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
