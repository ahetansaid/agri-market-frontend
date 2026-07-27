"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { AnnouncementCard } from "@/components/home/announcement-card";
import type { Announcement } from "@/lib/api";

interface Props {
  title: string;
  accent?: string;
  eyebrow?: string;
  eyebrowTone?: "orange" | "green";
  description?: string;
  viewAllHref: string;
  items: Announcement[];
}

export function ProductRail({
  title,
  accent,
  eyebrow,
  eyebrowTone = "orange",
  description,
  viewAllHref,
  items,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: 1 | -1) =>
    ref.current?.scrollBy({ left: d * 620, behavior: "smooth" });

  if (!items.length) return null;

  const accentCls =
    eyebrowTone === "green"
      ? "bg-gradient-to-br from-harvest-500 to-harvest-700 bg-clip-text text-transparent"
      : "bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent";
  const eyebrowCls =
    eyebrowTone === "green" ? "text-harvest-700" : "text-brand-700";

  return (
    <section className="py-10 sm:py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <header className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {eyebrow && (
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${eyebrowCls}`}
              >
                <span className="h-1 w-5 rounded-full bg-current opacity-60" />
                {eyebrow}
              </span>
            )}
            <h2 className="mt-2 font-display text-[clamp(1.5rem,4vw,2.35rem)] font-semibold leading-tight tracking-tight">
              {title}{" "}
              {accent && (
                <em className={`font-normal italic ${accentCls}`}>{accent}</em>
              )}
            </h2>
            {description && (
              <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={viewAllHref}
              className="group inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
            >
              Voir tout
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => scroll(-1)}
              aria-label="Précédent"
              className="hidden h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:bg-brand-50 hover:text-brand-700 sm:grid"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Suivant"
              className="hidden h-10 w-10 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:bg-brand-50 hover:text-brand-700 sm:grid"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </header>

        <div
          ref={ref}
          className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((a) => (
            <div
              key={a.id}
              className="w-[75vw] max-w-[280px] shrink-0 snap-start sm:w-[248px] sm:max-w-none"
            >
              <AnnouncementCard annonce={a} />
            </div>
          ))}
          <Link
            href={viewAllHref}
            className="grid w-[150px] shrink-0 snap-start place-items-center rounded-2xl border border-dashed border-border bg-card text-center transition hover:border-brand-300 hover:bg-brand-50"
          >
            <span className="flex flex-col items-center gap-2 text-sm font-semibold text-brand-700">
              <ArrowRight className="h-6 w-6" />
              Voir tout
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
