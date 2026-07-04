import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getEvents, type EventItem } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Users, ArrowRight, MapPin, CalendarX } from "lucide-react";

export const revalidate = 60;

const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function formatRange(startISO: string, endISO: string): string {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const sameMonth =
    s.getUTCFullYear() === e.getUTCFullYear() &&
    s.getUTCMonth() === e.getUTCMonth();
  const sameDay = sameMonth && s.getUTCDate() === e.getUTCDate();
  const d1 = s.getUTCDate();
  const d2 = e.getUTCDate();
  const m1 = MOIS[s.getUTCMonth()];
  const m2 = MOIS[e.getUTCMonth()];
  const y = e.getUTCFullYear();
  if (sameDay) return `${d1} ${m1} ${y}`;
  if (sameMonth) return `${d1} – ${d2} ${m1} ${y}`;
  return `${d1} ${m1} – ${d2} ${m2} ${y}`;
}

function EventCard({ ev }: { ev: EventItem }) {
  return (
    <Link
      href={`/evenements/${ev.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:border-harvest-500/50 hover:shadow-xl hover:shadow-harvest-500/10"
    >
      <div className="relative aspect-[580/360] overflow-hidden bg-sand-200">
        {ev.image_fr ? (
          <Image
            src={ev.image_fr}
            alt={ev.titre}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-harvest-600 to-harvest-800 text-white/40">
            <CalendarDays className="h-14 w-14" />
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <span
          className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${
            ev.prochain_evenement
              ? "bg-gradient-to-br from-harvest-500 to-harvest-700 text-white"
              : "bg-white/90 text-sand-700"
          }`}
        >
          {ev.prochain_evenement ? "À venir" : "Édition passée"}
        </span>
        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-sand-900 shadow-lg backdrop-blur-sm">
          <Users className="h-3 w-3 text-harvest-600" strokeWidth={2.5} />
          {ev.nb_interesses}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-harvest-700">
          <CalendarDays className="h-3.5 w-3.5" strokeWidth={2.5} />
          {formatRange(ev.date_debut, ev.date_fin)}
        </div>
        <h3 className="font-display line-clamp-2 text-lg font-semibold leading-snug tracking-tight text-foreground">
          {ev.titre}
        </h3>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-border/60 pt-4">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" strokeWidth={2} />
            Salon B2B
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-harvest-100/70 px-3 py-1 text-[11px] font-semibold text-harvest-700 transition group-hover:bg-harvest-600 group-hover:text-white">
            Découvrir
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={2.5} />
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function EvenementsPage() {
  const events = await getEvents().catch(() => []);
  const upcoming = events.filter((e) => e.prochain_evenement);
  const past = events.filter((e) => !e.prochain_evenement);

  return (
    <>
      <Header />

      <main className="flex-1 bg-sand-50">
        {/* Hero editorial dark */}
        <section className="relative overflow-hidden bg-sand-900 text-white">
          <div className="pointer-events-none absolute -left-24 top-10 h-96 w-96 rounded-full bg-harvest-600 opacity-25 blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-brand-500 opacity-20 blur-[100px]" />
          <div className="relative mx-auto max-w-7xl px-6 py-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-harvest-400" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                Rencontres & salons
              </span>
            </div>
            <h1 className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
              Là où l&apos;Afrique agricole
              <br />
              <em className="italic font-normal bg-gradient-to-br from-harvest-300 via-harvest-400 to-harvest-600 bg-clip-text text-transparent">
                se rencontre.
              </em>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Salons B2B, forums d&apos;investissement, rencontres filières.
              Retrouvez producteurs, coopératives et acheteurs sur le terrain.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-14">
          {events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-sand-100 text-sand-400">
                <CalendarX className="h-8 w-8" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-2xl font-semibold">
                Aucun événement pour l&apos;instant
              </h3>
              <p className="mt-2 mx-auto max-w-md text-sm text-muted-foreground">
                Revenez bientôt — de nouveaux salons et rencontres sont publiés
                régulièrement.
              </p>
            </div>
          ) : (
            <>
              {upcoming.length > 0 && (
                <section className="mb-16">
                  <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight">
                    À{" "}
                    <em className="italic font-normal bg-gradient-to-br from-harvest-500 to-harvest-700 bg-clip-text text-transparent">
                      venir
                    </em>
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {upcoming.map((ev) => (
                      <EventCard key={ev.id} ev={ev} />
                    ))}
                  </div>
                </section>
              )}

              {past.length > 0 && (
                <section>
                  <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight text-muted-foreground">
                    Éditions passées
                  </h2>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {past.map((ev) => (
                      <EventCard key={ev.id} ev={ev} />
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
