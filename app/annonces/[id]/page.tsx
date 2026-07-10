import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementCard } from "@/components/home/announcement-card";
import { getAnnouncementDetail, getAnnouncements } from "@/lib/api";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  Tag,
  ShoppingCart,
  Leaf,
  ShieldCheck,
  Package,
  Truck,
  Handshake,
  Clock,
  ChevronRight,
  MessageCircle,
  Share2,
  Copy,
  Star,
  Home,
} from "lucide-react";

export const revalidate = 60;

const typeIconMap: Record<string, typeof Tag> = {
  vente: Tag,
  achat: ShoppingCart,
  autre: Package,
};

export default async function DetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const annonceId = Number(id);
  if (!Number.isFinite(annonceId)) notFound();

  const annonce = await getAnnouncementDetail(annonceId).catch(() => null);
  if (!annonce) notFound();

  const similar = await getAnnouncements({
    sort: "recent",
    limit: 4,
  }).catch(() => []);
  const similarFiltered = similar.filter((a) => a.id !== annonce.id).slice(0, 4);

  const TypeIcon = typeIconMap[annonce.type] || Package;

  const publishedDate = new Date(annonce.published_at).toLocaleDateString(
    "fr-FR",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <>
      <Header />

      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-brand-600"
            >
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-3 w-3 text-sand-300" />
            <Link href="/annonces" className="hover:text-brand-600">
              Marketplace
            </Link>
            {annonce.category_name && (
              <>
                <ChevronRight className="h-3 w-3 text-sand-300" />
                <span>{annonce.category_name}</span>
              </>
            )}
            <ChevronRight className="h-3 w-3 text-sand-300" />
            <span className="font-medium text-foreground truncate">
              {annonce.title}
            </span>
          </nav>

          {/* Hero */}
          <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Media */}
            <div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-sand-200 shadow-xl">
                {annonce.image_url ? (
                  <Image
                    src={annonce.image_url}
                    alt={annonce.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-sand-300 to-sand-400 text-sand-100">
                    <Leaf className="h-32 w-32 opacity-30" />
                  </div>
                )}

                {/* Badges bottom */}
                <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                    <TypeIcon className="h-3 w-3" strokeWidth={2.5} />
                    {annonce.type_display}
                  </span>
                  {annonce.is_organic && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-harvest-500 to-harvest-700 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-white shadow-lg">
                      <Leaf className="h-3 w-3" strokeWidth={2.5} />
                      Bio
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-lg">
                    <ShieldCheck className="h-3 w-3" strokeWidth={2.5} />
                    Vérifié
                  </span>
                </div>
              </div>

              {/* Specs */}
              <SectionCard title="Caractéristiques essentielles" icon={Package}>
                <div className="grid gap-4 sm:grid-cols-2">
                  {annonce.quantity && (
                    <Spec
                      icon={Package}
                      label="Quantité disponible"
                      value={
                        <>
                          {annonce.quantity.toLocaleString("fr-FR")}{" "}
                          <span className="text-sm italic text-muted-foreground">
                            {annonce.unit}
                          </span>
                        </>
                      }
                    />
                  )}
                  {annonce.product_name && (
                    <Spec
                      icon={Leaf}
                      label="Produit"
                      value={annonce.product_name}
                    />
                  )}
                  {annonce.variety && (
                    <Spec
                      icon={Leaf}
                      label="Variété"
                      value={annonce.variety}
                    />
                  )}
                  {annonce.brand && (
                    <Spec
                      icon={Tag}
                      label="Marque"
                      value={annonce.brand}
                    />
                  )}
                  {annonce.shipping_conditions && (
                    <Spec
                      icon={Truck}
                      label="Livraison"
                      value={annonce.shipping_conditions}
                    />
                  )}
                  {annonce.transaction_details && (
                    <Spec
                      icon={Handshake}
                      label="Conditions"
                      value={annonce.transaction_details}
                    />
                  )}
                </div>
              </SectionCard>

              {/* Description */}
              {annonce.description && (
                <SectionCard title="Description" icon={Tag}>
                  <div
                    className="prose prose-sand max-w-none prose-a:text-brand-700"
                    dangerouslySetInnerHTML={{
                      __html: sanitizeHtml(annonce.description),
                    }}
                  />
                </SectionCard>
              )}
            </div>

            {/* Aside sticky info */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
              {/* Head */}
              <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                {annonce.country_code && (
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200">
                    <span
                      className={`fi fi-${annonce.country_code.toLowerCase()} h-3 w-4 rounded-sm`}
                    />
                    {annonce.country_name}
                  </div>
                )}
                <h1 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {annonce.title}
                </h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-3 w-3 text-brand-600" />
                    {publishedDate}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Tag className="h-3 w-3 text-brand-600" />
                    {annonce.reference}
                  </span>
                </div>
              </div>

              {/* Price highlight */}
              {annonce.quantity && (
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-900 to-sand-800 p-5 text-white shadow-2xl">
                  <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/25 blur-2xl" />
                  <div className="relative flex items-baseline justify-between gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Disponibilité
                    </span>
                    <div className="font-display text-2xl font-semibold">
                      <span className="bg-gradient-to-br from-brand-200 to-brand-400 bg-clip-text text-transparent">
                        {annonce.quantity.toLocaleString("fr-FR")}
                      </span>{" "}
                      <span className="text-sm italic text-white/70">
                        {annonce.unit}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
                <button
                  type="button"
                  className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-brand-600/50"
                >
                  <MessageCircle className="h-4 w-4" strokeWidth={2.5} />
                  {annonce.type === "achat"
                    ? "Proposer mon produit"
                    : "Contacter le vendeur"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Copier
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
                  >
                    <Share2 className="h-3.5 w-3.5" />
                    Partager
                  </button>
                </div>
                <p className="mt-1 inline-flex items-start gap-1.5 text-xs text-harvest-700">
                  <ShieldCheck
                    className="h-4 w-4 shrink-0"
                    strokeWidth={2}
                  />
                  Annonce vérifiée par double validation humaine
                </p>
              </div>

              {/* Seller */}
              <Link
                href={`/annonces?user=${annonce.seller.id}`}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-900 to-sand-800 p-5 text-white shadow-xl transition hover:shadow-2xl"
              >
                <div className="pointer-events-none absolute -left-10 -bottom-10 h-32 w-32 rounded-full bg-brand-500/25 blur-2xl" />
                <div className="relative flex items-center gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
                    {annonce.seller.picture ? (
                      <Image
                        src={annonce.seller.picture}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-500 to-brand-700 font-display font-bold">
                        {annonce.seller.display_name?.[0]?.toUpperCase() ??
                          annonce.seller.username[0]?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-widest text-white/50 font-semibold">
                      Publié par
                    </div>
                    <div className="truncate font-display font-semibold">
                      {annonce.seller.display_name ||
                        annonce.seller.username}
                    </div>
                    {annonce.seller.ratings_count > 0 && (
                      <div className="mt-1 flex items-center gap-1 text-xs">
                        <Star
                          className="h-3 w-3 fill-amber-400 text-amber-400"
                          strokeWidth={0}
                        />
                        <span className="font-semibold">
                          {annonce.seller.rating_avg}
                        </span>
                        <span className="text-white/50">
                          ({annonce.seller.ratings_count} avis)
                        </span>
                      </div>
                    )}
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/40 transition group-hover:translate-x-1 group-hover:text-brand-400" />
                </div>
              </Link>
            </aside>
          </section>

          {/* Similar */}
          {similarFiltered.length > 0 && (
            <section className="mt-20">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-200 mb-3">
                    Recommandations
                  </span>
                  <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                    Annonces{" "}
                    <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                      similaires
                    </em>
                  </h2>
                </div>
                <Link
                  href="/annonces"
                  className="inline-flex items-center gap-2 rounded-full bg-sand-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-600 transition"
                >
                  Voir plus
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                {similarFiltered.map((a) => (
                  <AnnouncementCard key={a.id} annonce={a} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

/* Helpers */
function SectionCard({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 rounded-3xl bg-card p-6 sm:p-8 shadow-sm ring-1 ring-border">
      <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
        <Icon className="h-5 w-5 text-brand-600" strokeWidth={2} />
        {title}
      </h2>
      {children}
    </section>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-transparent bg-sand-50 p-4 transition hover:border-brand-200 hover:bg-background">
      <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-50 text-brand-700">
        <Icon className="h-4 w-4" strokeWidth={2} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
        <div className="mt-0.5 font-display text-base font-semibold leading-tight text-foreground">
          {value}
        </div>
      </div>
    </div>
  );
}

