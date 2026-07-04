"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { CalendarDays, Users, ArrowRight, MapPin } from "lucide-react";
import type { EventItem } from "@/lib/api";

const MOIS = [
  "janv.", "févr.", "mars", "avr.", "mai", "juin",
  "juil.", "août", "sept.", "oct.", "nov.", "déc.",
];

/** Formate une plage de dates : "14 – 16 avr. 2026" ou "14 avr. 2026". */
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

export function EventsRail({ events }: { events: EventItem[] }) {
  if (!events.length) return null;

  return (
    <section
      id="evenements"
      className="border-y border-border/40 bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-wrap items-end justify-between gap-4"
        >
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-harvest-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-harvest-700 ring-1 ring-harvest-500/20">
              <CalendarDays className="h-3 w-3" strokeWidth={2.5} />
              Rencontres & salons
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Événements{" "}
              <em className="italic font-normal bg-gradient-to-br from-harvest-500 to-harvest-700 bg-clip-text text-transparent">
                à ne pas manquer.
              </em>
            </h2>
          </div>
          <Link
            href="/evenements"
            className="group inline-flex items-center gap-2 rounded-full bg-sand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-harvest-600"
          >
            Tous les événements
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.header>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((ev, i) => (
            <motion.article
              key={ev.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group"
            >
              <Link
                href={`/evenements/${ev.slug}`}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-sm transition hover:-translate-y-1 hover:border-harvest-500/50 hover:shadow-xl hover:shadow-harvest-500/10"
              >
                {/* Image */}
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

                  {/* Badge à venir / passé */}
                  <span
                    className={`absolute left-3 top-3 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${
                      ev.prochain_evenement
                        ? "bg-gradient-to-br from-harvest-500 to-harvest-700 text-white"
                        : "bg-white/90 text-sand-700"
                    }`}
                  >
                    {ev.prochain_evenement ? "À venir" : "Édition passée"}
                  </span>

                  {/* Intéressés */}
                  <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-sand-900 shadow-lg backdrop-blur-sm">
                    <Users className="h-3 w-3 text-harvest-600" strokeWidth={2.5} />
                    {ev.nb_interesses}
                  </span>
                </div>

                {/* Body */}
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
                      <ArrowRight
                        className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
