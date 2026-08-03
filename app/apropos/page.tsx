import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAboutPage } from "@/lib/api";
import { getT } from "@/lib/i18n/server";
import {
  Sprout,
  Eye,
  Compass,
  Target,
  ArrowRight,
  Award,
  Leaf,
  Users,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Rocket,
  Globe,
  Languages,
  Percent,
} from "lucide-react";

export const metadata = { title: "À propos" };
export const dynamic = "force-dynamic";

// Correspondance nom d'icône (stocké en base) -> composant lucide.
const VALUE_ICONS: Record<string, typeof Award> = {
  Award,
  Leaf,
  Users,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  HeartHandshake,
  Rocket,
  Globe,
};

const STATS = [
  { icon: Globe, value: "54", label: "Pays africains" },
  { icon: Users, value: "10 000+", label: "Producteurs ciblés" },
  { icon: Languages, value: "3", label: "Langues (FR · EN · IT)" },
  { icon: Percent, value: "0 €", label: "Commission sur ventes" },
];

const TIMELINE = [
  {
    year: "2024",
    title: "Une idée née sur le terrain",
    text: "L'équipe IDA International, présente en Afrique de l'Ouest depuis plus de dix ans, constate la difficulté chronique des producteurs à trouver des débouchés équitables.",
  },
  {
    year: "Début 2025",
    title: "Prototype et premiers pilotes",
    text: "Lancement de la plateforme en bêta avec une dizaine de coopératives partenaires au Bénin, au Sénégal et en Côte d'Ivoire.",
  },
  {
    year: "Mi-2025",
    title: "Ouverture publique",
    text: "La marketplace s'ouvre aux 54 pays africains. Multilingue, multi-filières, validation à deux niveaux pour garantir la qualité.",
  },
  {
    year: "2026",
    title: "Vers une communauté panafricaine",
    text: "Objectif : devenir la référence du B2B agricole africain, avec événements, partenariats institutionnels et services à valeur ajoutée pour les producteurs.",
  },
];

export default async function AProposPage() {
  const { t, locale } = await getT();
  const about = await getAboutPage(locale).catch(() => null);

  // Repli gracieux : si le contenu dynamique est indisponible, on affiche
  // au moins l'intro traduite (clés i18n existantes).
  if (!about) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-sand-50">
          <div className="mx-auto max-w-3xl px-4 py-16 sm:py-24">
            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {t("apropos.title")}
            </h1>
            <p className="mt-3 text-base text-muted-foreground">
              {t("apropos.subtitle")}
            </p>
            <p className="mt-8 text-sm leading-relaxed text-foreground/80">
              {t("apropos.p1")}
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        {/* HERO éditorial */}
        <section className="relative overflow-hidden bg-sand-900 text-white">
          <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand-600 opacity-25 blur-[120px]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-harvest-500 opacity-20 blur-[120px]" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300 backdrop-blur">
              <Sprout className="h-3.5 w-3.5" />
              {t("nav.apropos")}
            </span>
            <h1 className="mt-5 font-display text-[clamp(1.9rem,5.5vw,3.5rem)] font-medium leading-[1.08] tracking-tight">
              {about.title}
            </h1>
            <p className="mt-6 text-base leading-relaxed text-white/75 sm:text-lg">
              {about.intro}
            </p>
          </div>
        </section>

        {/* BARRE DE STATS */}
        <section className="border-b border-border bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 px-5 py-8 sm:px-6 lg:grid-cols-4">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <div className="font-display text-2xl font-semibold tracking-tight">
                    {value}
                  </div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mx-auto max-w-5xl space-y-6 px-4 py-14 sm:space-y-8 sm:px-6 sm:py-16">
          {/* VISION */}
          <SectionBlock
            icon={Eye}
            tone="brand"
            title={about.vision_title}
            text={about.vision}
          />

          {/* PERSPECTIVES */}
          <SectionBlock
            icon={Compass}
            tone="harvest"
            title={about.perspectives_title}
            text={about.perspectives}
          />

          {/* VALEURS */}
          {about.values.length > 0 && (
            <section className="pt-4">
              <div className="mb-8 text-center">
                <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                  {renderTitle(about.values_title)}
                </h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                {about.values.map((v, i) => {
                  const Icon = VALUE_ICONS[v.icon] ?? Sparkles;
                  const green = i % 2 === 1;
                  return (
                    <div
                      key={i}
                      className="group relative flex flex-col overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div
                        className={`pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full blur-2xl transition ${
                          green
                            ? "bg-harvest-500/10 group-hover:bg-harvest-500/20"
                            : "bg-brand-500/10 group-hover:bg-brand-500/20"
                        }`}
                      />
                      <div
                        className={`relative mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl text-white shadow-sm ${
                          green
                            ? "bg-gradient-to-br from-harvest-500 to-harvest-700"
                            : "bg-gradient-to-br from-brand-500 to-brand-700"
                        }`}
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <h3 className="relative font-display text-lg font-semibold tracking-tight">
                        {v.title}
                      </h3>
                      <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">
                        {v.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* MISSION */}
          <SectionBlock
            icon={Target}
            tone="brand"
            title={about.mission_title}
            text={about.mission}
          />

          {/* PARCOURS / TIMELINE */}
          <section className="pt-4">
            <div className="mb-8 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
                Parcours
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Le chemin parcouru.
              </h2>
            </div>
            <ol className="relative mx-auto max-w-2xl space-y-6 border-l-2 border-border pl-6">
              {TIMELINE.map((step) => (
                <li key={step.year} className="relative">
                  <span className="absolute -left-[31px] top-1 grid h-5 w-5 place-items-center rounded-full border-2 border-brand-500 bg-white">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                  </span>
                  <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                    <span className="text-xs font-bold uppercase tracking-wide text-harvest-700">
                      {step.year}
                    </span>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* CTA */}
          <div className="rounded-3xl bg-gradient-to-br from-sand-900 to-sand-800 p-8 text-center text-white shadow-xl sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {t("cta.eyebrow")}
            </h2>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/annonces"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-6 py-3 text-sm font-semibold shadow-lg shadow-brand-700/25 transition hover:-translate-y-0.5"
              >
                {t("nav.marketplace")}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold backdrop-blur transition hover:bg-white/10"
              >
                {t("action.createAccount")}
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/** Met le dernier mot du titre en italique dégradé (accent éditorial). */
function renderTitle(title: string) {
  const words = title.trim().split(" ");
  if (words.length < 2) return title;
  const last = words.pop();
  return (
    <>
      {words.join(" ")}{" "}
      <em className="italic font-normal bg-gradient-to-br from-brand-500 to-harvest-600 bg-clip-text text-transparent">
        {last}
      </em>
    </>
  );
}

function SectionBlock({
  icon: Icon,
  tone,
  title,
  text,
}: {
  icon: typeof Eye;
  tone: "brand" | "harvest";
  title: string;
  text: string;
}) {
  const green = tone === "harvest";
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8">
      <div className="flex items-center gap-4">
        <div
          className={`inline-grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white shadow-sm ${
            green
              ? "bg-gradient-to-br from-harvest-500 to-harvest-700"
              : "bg-gradient-to-br from-brand-500 to-brand-700"
          }`}
        >
          <Icon className="h-6 w-6" strokeWidth={2} />
        </div>
        <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
      </div>
      <p className="mt-5 text-sm leading-relaxed text-foreground/80 sm:text-[15px]">
        {text}
      </p>
    </section>
  );
}
