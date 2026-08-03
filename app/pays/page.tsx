import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getCountriesActivity } from "@/lib/api";
import { getT } from "@/lib/i18n/server";
import { Globe, ArrowRight } from "lucide-react";
import { AfricaMapInteractive } from "@/components/pays/africa-map-interactive";

export const metadata = { title: "Pays" };

function countryName(code: string, locale: string): string {
  try {
    return (
      new Intl.DisplayNames([locale], { type: "region" }).of(
        code.toUpperCase()
      ) || code
    );
  } catch {
    return code;
  }
}

export default async function PaysPage() {
  const { t, locale } = await getT();
  let counts: Record<string, number> = {};
  try {
    counts = (await getCountriesActivity()).counts ?? {};
  } catch {
    counts = {};
  }

  const rows = Object.entries(counts)
    .filter(([code]) => code && code.length === 2)
    .sort((a, b) => b[1] - a[1]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <header className="mb-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-700">
              <Globe className="h-3.5 w-3.5" />
              {t("pays.eyebrow")}
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("pays.title1")}{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                {t("pays.title2")}
              </em>
            </h1>
            <p className="mt-3 text-muted-foreground">
              {t("pays.desc")}
            </p>
          </header>

          {/* Carte interactive d'Afrique */}
          <div className="mb-12">
            <AfricaMapInteractive counts={counts} />
          </div>

          {rows.length > 0 && (
            <h2 className="mb-4 font-display text-xl font-semibold tracking-tight">
              Tous les pays actifs
            </h2>
          )}

          {rows.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
              {t("pays.unavailable")}{" "}
              <Link href="/annonces" className="font-semibold text-brand-700 hover:underline">
                {t("dash.bSeeAll")}
              </Link>
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {rows.map(([code, n]) => (
                <Link
                  key={code}
                  href="/annonces"
                  className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
                >
                  <span
                    className={`fi fi-${code.toLowerCase()} h-8 w-11 shrink-0 rounded-md shadow-sm ring-1 ring-border`}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-display font-semibold tracking-tight">
                      {countryName(code, locale)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {n} {n > 1 ? t("pays.listingsActive") : t("pays.listingActive")}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-brand-600" />
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
