import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/home/hero";
import { AnnouncementCard } from "@/components/home/announcement-card";
import { ProducerOfMonthSection } from "@/components/home/producer-of-month";
import { SpotlightCategorySection } from "@/components/home/spotlight-category";
import { AfricaMapSection } from "@/components/home/africa-map";
import { EventsRail } from "@/components/home/events-rail";
import {
  getStats,
  getAnnouncements,
  getProducerOfMonth,
  getSpotlightCategory,
  getCountriesActivity,
  getEvents,
} from "@/lib/api";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60;

export default async function HomePage() {
  const [stats, annonces, producerData, spotlight, mapData, events] =
    await Promise.all([
      getStats().catch(() => ({
        producteurs: 0,
        pays_africains: 54,
        filieres: 0,
        commission: "0%",
        annonces_actives: 0,
        pays_actifs: 0,
      })),
      getAnnouncements({ sort: "recent", limit: 8 }).catch(() => []),
      getProducerOfMonth().catch(() => ({ producer: null, featured: null })),
      getSpotlightCategory().catch(() => null),
      getCountriesActivity().catch(() => ({ counts: {} as Record<string, number> })),
      getEvents(3).catch(() => []),
    ]);

  const activeCountriesCount = Object.keys(mapData.counts).length;

  return (
    <>
      <Header />

      <main className="flex-1">
        {/* 1. HERO */}
        <Hero stats={stats} />

        {/* 2. Rail "Dernières annonces" */}
        <section className="border-b border-border/40 bg-background py-24">
          <div className="mx-auto max-w-7xl px-6">
            <header className="mb-10 flex items-end justify-between gap-4 flex-wrap">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-200">
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
                className="group inline-flex items-center gap-2 rounded-full bg-sand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
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
                <p className="italic font-display text-muted-foreground">
                  Impossible de récupérer les annonces. Vérifie que Django
                  tourne sur{" "}
                  <code className="font-mono text-brand-700">:8000</code>.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* 3. Producer of the Month */}
        {producerData.producer && (
          <ProducerOfMonthSection data={producerData} />
        )}

        {/* 4. Spotlight catégorie */}
        {spotlight && <SpotlightCategorySection category={spotlight} />}

        {/* 5. Africa Map */}
        <AfricaMapSection
          counts={mapData.counts}
          activeCountriesCount={activeCountriesCount}
        />

        {/* 6. Événements & salons */}
        <EventsRail events={events} />

        {/* 7. CTA final */}
        <section className="relative overflow-hidden bg-gradient-to-br from-sand-900 via-sand-800 to-[#2a1a14] py-24 text-white">
          <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-brand-600 opacity-30 blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 bottom-10 h-96 w-96 rounded-full bg-brand-400 opacity-25 blur-[100px]" />

          <div className="relative mx-auto max-w-4xl px-6 text-center">
            <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400 backdrop-blur">
              Rejoignez la communauté
            </span>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Producteurs, acheteurs, coopératives —
              <br />
              <em className="italic font-normal bg-gradient-to-br from-brand-200 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                construisons ensemble.
              </em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Inscription gratuite, première annonce en ligne en moins de 3
              minutes. Pas de commission, pas d&apos;engagement.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {[
                { num: stats.producteurs, label: "Producteurs" },
                { num: 54, label: "Pays africains" },
                { num: "0%", label: "Commission" },
                { num: "24h", label: "Validation" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-bold tracking-tight sm:text-4xl bg-gradient-to-br from-white via-brand-200 to-brand-400 bg-clip-text text-transparent">
                    {s.num}
                  </div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-white/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-7 py-3.5 text-sm font-semibold text-white shadow-xl shadow-brand-700/40 transition hover:-translate-y-0.5 hover:shadow-brand-700/60"
              >
                Créer mon compte
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/10 hover:-translate-y-0.5"
              >
                J&apos;ai déjà un compte
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
