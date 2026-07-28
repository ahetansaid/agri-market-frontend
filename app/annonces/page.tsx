import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { AnnouncementCard } from "@/components/home/announcement-card";
import { ListingFilters } from "@/components/listing/listing-filters";
import { ListingSort } from "@/components/listing/listing-sort";
import { getAnnouncements, getCategories } from "@/lib/api";
import { getT } from "@/lib/i18n/server";
import { PackageOpen, Filter } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface Search {
  q?: string;
  type?: string;
  category?: string;
  country?: string;
  bio?: string;
  sort?: string;
}

export default async function AnnouncementsPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const params = await searchParams;
  const { t } = await getT();

  const [annonces, categories] = await Promise.all([
    getAnnouncements({
      q: params.q,
      type: params.type,
      category: params.category ? Number(params.category) : undefined,
      country: params.country,
      bio: params.bio === "1",
      sort:
        (params.sort as "recent" | "popular" | "old" | undefined) ?? "recent",
    }).catch(() => []),
    getCategories().catch(() => []),
  ]);

  const activeFilters = [
    params.q && { key: "q", label: `"${params.q}"` },
    params.type && { key: "type", label: params.type },
    params.country && { key: "country", label: params.country },
    params.bio === "1" && { key: "bio", label: "Bio" },
    params.category && {
      key: "category",
      label:
        categories.find((c) => c.id === Number(params.category))?.name ?? "",
    },
  ].filter(Boolean) as { key: string; label: string }[];

  return (
    <>
      <Header />

      <main className="flex-1 bg-sand-50">
        {/* Hero editorial dark */}
        <section className="relative overflow-hidden bg-sand-900 text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><pattern id='a' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'><path d='M30 6 L54 30 L30 54 L6 30 Z' fill='none' stroke='%23ffffff' stroke-width='1.2'/><circle cx='30' cy='30' r='3' fill='%23ffffff'/></pattern></defs><rect width='120' height='120' fill='url(%23a)'/></svg>")`,
            }}
          />
          <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-brand-600 opacity-30 blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-brand-400 opacity-20 blur-[100px]" />

          <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {t("annonces.eyebrow")}
              </span>
            </div>
            <h1 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
              {t("annonces.title1")}
              <br />
              <em className="italic font-normal bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                {t("annonces.title2")}
              </em>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/70 sm:text-lg">
              {t("annonces.heroSubtitle")}
            </p>

            {/* Search bar XL */}
            <form
              action="/annonces"
              method="GET"
              className="mt-8 flex flex-wrap gap-2 rounded-2xl bg-white/95 p-2 shadow-2xl backdrop-blur"
            >
              <input
                type="search"
                name="q"
                defaultValue={params.q}
                placeholder={t("annonces.searchPlaceholder")}
                className="min-w-[240px] flex-1 rounded-lg bg-transparent px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none"
              />
              <select
                name="category"
                defaultValue={params.category ?? ""}
                className="rounded-lg bg-transparent px-3 py-3 text-sm text-foreground outline-none"
              >
                <option value="">{t("hero.allSectors")}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:shadow-brand-600/50"
              >
                {t("action.searchBtn")}
              </button>
            </form>
          </div>
        </section>

        {/* Results bar */}
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                {params.q ? (
                  <>
                    {annonces.length} {t("word.results")} {t("annonces.for")}{" "}
                    <em className="italic">&laquo; {params.q} &raquo;</em>
                  </>
                ) : (
                  <>
                    {annonces.length} {t("word.listings")}
                  </>
                )}
              </h2>
            </div>
            <ListingSort current={params.sort ?? "recent"} params={params} />
          </div>

          {/* Active filters */}
          {activeFilters.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("annonces.filtersLabel")}
              </span>
              {activeFilters.map((f) => (
                <span
                  key={f.key}
                  className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200"
                >
                  {f.label}
                </span>
              ))}
              <Link
                href="/annonces"
                className="ml-auto text-xs text-muted-foreground underline hover:text-foreground"
              >
                {t("annonces.clearAll")}
              </Link>
            </div>
          )}

          {/* Layout 2 col */}
          <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
            <ListingFilters
              categories={categories}
              current={{
                type: params.type,
                category: params.category,
                country: params.country,
                bio: params.bio === "1",
                q: params.q,
                sort: params.sort,
              }}
            />

            <section>
              {annonces.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {annonces.map((a) => (
                    <AnnouncementCard key={a.id} annonce={a} />
                  ))}
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
                  <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sand-100 text-sand-400">
                    <PackageOpen className="h-8 w-8" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-display text-2xl font-semibold">
                    {t("annonces.emptyTitle")}
                  </h3>
                  <p className="mt-2 mx-auto max-w-md text-sm text-muted-foreground">
                    {t("annonces.emptyText")}
                  </p>
                  <Link
                    href="/annonces"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-semibold text-white"
                  >
                    <Filter className="h-4 w-4" />
                    {t("annonces.resetFilters")}
                  </Link>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
