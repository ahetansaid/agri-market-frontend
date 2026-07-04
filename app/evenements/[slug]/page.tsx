import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getEventDetail } from "@/lib/api";
import { sanitizeHtml } from "@/lib/sanitize";
import {
  CalendarDays,
  Users,
  Clock,
  ChevronRight,
  Home,
  MapPin,
  ClipboardList,
  ArrowRight,
} from "lucide-react";

export const revalidate = 60;

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function fmt(iso: string): string {
  const d = new Date(iso);
  return `${d.getUTCDate()} ${MOIS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
}

function fmtTime(iso: string): string {
  const d = new Date(iso);
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}h${m}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = await getEventDetail(slug);
  if (!ev) return { title: "Événement introuvable" };
  return {
    title: ev.titre,
    description: `${ev.titre} — ${fmt(ev.date_debut)}. ${ev.nb_interesses} personnes intéressées.`,
  };
}

export default async function EvenementDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ev = await getEventDetail(slug);
  if (!ev) notFound();

  const nbQuestions =
    ev.questionnaire?.sections.reduce(
      (acc, s) => acc + s.questions.length,
      0
    ) ?? 0;

  return (
    <>
      <Header />

      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-7xl px-6 py-10">
          {/* Breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
            <Link href="/" className="inline-flex items-center gap-1 hover:text-harvest-700">
              <Home className="h-3.5 w-3.5" />
            </Link>
            <ChevronRight className="h-3 w-3 text-sand-300" />
            <Link href="/evenements" className="hover:text-harvest-700">
              Événements
            </Link>
            <ChevronRight className="h-3 w-3 text-sand-300" />
            <span className="font-medium text-foreground truncate">{ev.titre}</span>
          </nav>

          <section className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
            {/* Main */}
            <div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-sand-200 shadow-xl">
                {ev.image_fr ? (
                  <Image
                    src={ev.image_fr}
                    alt={ev.titre}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    priority
                    className="object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-harvest-600 to-harvest-800 text-white/40">
                    <CalendarDays className="h-28 w-28" />
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span
                  className={`absolute left-4 top-4 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm ${
                    ev.prochain_evenement
                      ? "bg-gradient-to-br from-harvest-500 to-harvest-700 text-white"
                      : "bg-white/90 text-sand-700"
                  }`}
                >
                  {ev.prochain_evenement ? "À venir" : "Édition passée"}
                </span>
              </div>

              {ev.description_fr && (
                <section className="mt-6 rounded-3xl bg-card p-6 sm:p-8 shadow-sm ring-1 ring-border">
                  <h2 className="mb-5 flex items-center gap-2 font-display text-xl font-semibold tracking-tight">
                    <CalendarDays className="h-5 w-5 text-harvest-600" strokeWidth={2} />
                    À propos de l&apos;événement
                  </h2>
                  <div
                    className="prose prose-sand max-w-none prose-a:text-harvest-700"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(ev.description_fr) }}
                  />
                </section>
              )}
            </div>

            {/* Aside */}
            <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
                <h1 className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  {ev.titre}
                </h1>

                <dl className="mt-5 flex flex-col gap-3 text-sm">
                  <div className="flex items-start gap-3">
                    <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-harvest-600" strokeWidth={2} />
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Dates
                      </dt>
                      <dd className="font-medium">
                        {fmt(ev.date_debut)}
                        {fmt(ev.date_debut) !== fmt(ev.date_fin) && (
                          <> → {fmt(ev.date_fin)}</>
                        )}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 h-4 w-4 shrink-0 text-harvest-600" strokeWidth={2} />
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Horaire
                      </dt>
                      <dd className="font-medium">
                        {fmtTime(ev.date_debut)} – {fmtTime(ev.date_fin)}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-harvest-600" strokeWidth={2} />
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        Format
                      </dt>
                      <dd className="font-medium">Salon B2B</dd>
                    </div>
                  </div>
                </dl>
              </div>

              {/* Interested */}
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sand-900 to-sand-800 p-5 text-white shadow-2xl">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-harvest-500/25 blur-2xl" />
                <div className="relative flex items-center gap-3">
                  <Users className="h-8 w-8 text-harvest-400" strokeWidth={1.75} />
                  <div>
                    <div className="font-display text-3xl font-bold leading-none">
                      {ev.nb_interesses}
                    </div>
                    <div className="text-xs text-white/60">
                      personnes intéressées
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-3 rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
                {ev.prochain_evenement ? (
                  <>
                    <Link
                      href={`/login?next=/evenements/${ev.slug}`}
                      className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-harvest-500 via-harvest-600 to-harvest-700 px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-harvest-600/30 transition-all hover:-translate-y-0.5 hover:shadow-harvest-600/50"
                    >
                      <ClipboardList className="h-4 w-4" strokeWidth={2.5} />
                      Manifester mon intérêt
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                    {nbQuestions > 0 && (
                      <p className="text-center text-xs text-muted-foreground">
                        Formulaire d&apos;inscription en {nbQuestions} question
                        {nbQuestions > 1 ? "s" : ""}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="inline-flex items-start gap-1.5 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 shrink-0 text-sand-400" strokeWidth={2} />
                    Cette édition est terminée. Restez à l&apos;affût des
                    prochaines rencontres.
                  </p>
                )}
              </div>

              <Link
                href="/evenements"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold transition hover:border-harvest-300 hover:bg-harvest-100/40 hover:text-harvest-700"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Tous les événements
              </Link>
            </aside>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
