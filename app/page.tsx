import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { AnnouncementCard } from "@/components/home/announcement-card";
import { getStats, getAnnouncements } from "@/lib/api";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

// Force ISR revalidation
export const revalidate = 60;

export default async function HomePage() {
  // Fetch en parallèle avec fallback safe
  const [stats, annonces] = await Promise.all([
    getStats().catch(() => ({
      producteurs: 0,
      pays_africains: 54,
      filieres: 0,
      commission: "0%",
      annonces_actives: 0,
      pays_actifs: 0,
    })),
    getAnnouncements({ sort: "recent", limit: 8 }).catch(() => []),
  ]);

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <Hero stats={stats} />

        {/* Rail "Dernières annonces" */}
        <section className="border-y border-border/40 bg-background py-20">
          <div className="mx-auto max-w-7xl px-6">
            <header className="mb-10 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700 mb-3">
                  <Sparkles className="h-3 w-3" strokeWidth={2.5} />
                  Fraîchement publiées
                </span>
                <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                  Dernières{" "}
                  <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                    annonces
                  </em>
                </h2>
              </div>
              <Link
                href="/annonces"
                className="group inline-flex items-center gap-2 rounded-full bg-sand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition"
              >
                Tout voir
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </header>

            {annonces.length > 0 ? (
              <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                {annonces.map((annonce) => (
                  <AnnouncementCard key={annonce.id} annonce={annonce} />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-16 text-center">
                <p className="text-muted-foreground italic font-display">
                  Impossible de récupérer les annonces. Vérifie que Django tourne
                  sur <code className="font-mono text-brand-700">:8000</code>.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Marker sections à venir en session 2 */}
        <section className="bg-sand-100 py-20">
          <div className="mx-auto max-w-7xl px-6 text-center">
            <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
              → Producteur du mois · Spotlight filière · Carte d&apos;Afrique
              interactive · Événements
            </p>
            <p className="mt-2 text-xs italic text-muted-foreground/60 font-display">
              (À venir en session 2)
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
