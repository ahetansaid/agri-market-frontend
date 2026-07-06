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
  viewAllHref: string;
  items: Announcement[];
}

export function ProductRail({
  title,
  accent,
  eyebrow,
  eyebrowTone = "orange",
  viewAllHref,
  items,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (d: 1 | -1) =>
    ref.current?.scrollBy({ left: d * 620, behavior: "smooth" });

  if (!items.length) return null;

  return (
    <section className="py-7">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-5 flex items-end justify-between gap-4">
          <div>
            {eyebrow && (
              <span
                className={`text-[10px] font-bold uppercase tracking-widest ${
                  eyebrowTone === "green" ? "text-harvest-700" : "text-brand-700"
                }`}
              >
                {eyebrow}
              </span>
            )}
            <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}{" "}
              {accent && (
                <em className="text-gradient-brand font-normal italic">{accent}</em>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={viewAllHref}
              className="group hidden items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 sm:inline-flex"
            >
              Voir tout
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              onClick={() => scroll(-1)}
              aria-label="Précédent"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Suivant"
              className="grid h-9 w-9 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:bg-brand-50 hover:text-brand-700"
            >
              <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
            </button>
          </div>
        </header>

        <div
          ref={ref}
          className="flex snap-x gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((a) => (
            <div key={a.id} className="w-[230px] shrink-0 snap-start">
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
