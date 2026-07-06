import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromoBanner } from "@/components/home/promo-banner";
import { Hero } from "@/components/home/hero";
import { QuickAccess } from "@/components/home/quick-access";
import { ProductRail } from "@/components/home/product-rail";
import { TrendingChart } from "@/components/home/trending-chart";
import { BioSpotlight } from "@/components/home/bio-spotlight";
import { ProductGrid } from "@/components/home/product-grid";
import { TopProducers } from "@/components/home/top-producers";
import { ProducerOfMonthSection } from "@/components/home/producer-of-month";
import { EventsRail } from "@/components/home/events-rail";
import { CtaBand } from "@/components/home/cta-band";
import {
  getStats,
  getAnnouncements,
  getCategories,
  getProducerOfMonth,
  getEvents,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  // Un seul appel d'annonces (les autres rails sont dérivés) pour soulager
  // le serveur Django de dev (mono-process + N+1 sur les notes).
  const [stats, all, categories, producerData, events] = await Promise.all([
    getStats().catch(() => ({
      producteurs: 0,
      pays_africains: 54,
      filieres: 0,
      commission: "0%",
      annonces_actives: 0,
      pays_actifs: 0,
    })),
    getAnnouncements({ sort: "recent", limit: 24 }).catch(() => []),
    getCategories().catch(() => []),
    getProducerOfMonth().catch(() => ({ producer: null, featured: null })),
    getEvents(3).catch(() => []),
  ]);

  // Rails dérivés du même jeu de données (aucune requête supplémentaire)
  const recent = all.slice(0, 12);
  const popular = all.slice(0, 12);
  const bio = all.filter((a) => a.is_organic).slice(0, 12);
  const topCats = categories.filter((c) => c.annonces_count >= 2).slice(0, 1);
  const catRails = topCats.map((c) => ({
    cat: c,
    items: all.filter((a) => a.category_name === c.name),
  }));

  return (
    <>
      <Header />

      <main className="flex-1">
        <PromoBanner />

        {/* Hero */}
        <Hero stats={stats} />

        {/* Accès rapide */}
        <QuickAccess />

        {/* Carrousel — Dernières annonces */}
        <ProductRail
          eyebrow="Fraîchement publiées"
          title="Dernières"
          accent="annonces"
          viewAllHref="/annonces?sort=recent"
          items={recent.slice(0, 12)}
        />

        {/* Classement — Populaires (podium) */}
        <TrendingChart items={popular} viewAllHref="/annonces?sort=popular" />

        {/* Producteurs à la une (avatars) */}
        <TopProducers items={recent} />

        {/* Éditorial — Bio (panneau + grille) */}
        <BioSpotlight items={bio} />

        {/* Grilles par filière */}
        {catRails.map(({ cat, items }, i) => (
          <ProductGrid
            key={cat.id}
            title={cat.name}
            items={items}
            viewAllHref={`/annonces?category=${cat.id}`}
            tinted={i % 2 === 1}
          />
        ))}

        {/* Producteur du mois (éditorial) */}
        {producerData.producer && <ProducerOfMonthSection data={producerData} />}

        {/* Événements & salons */}
        <EventsRail events={events} />

        {/* CTA final */}
        <CtaBand stats={stats} />
      </main>

      <Footer />
    </>
  );
}
