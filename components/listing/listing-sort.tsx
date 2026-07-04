"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowUpDown, Clock, Flame, History, Check } from "lucide-react";

const SORTS = {
  recent: { label: "Plus récentes", icon: Clock },
  popular: { label: "Plus consultées", icon: Flame },
  old: { label: "Plus anciennes", icon: History },
} as const;

interface Params {
  q?: string;
  type?: string;
  category?: string;
  country?: string;
  bio?: string;
}

export function ListingSort({
  current,
  params,
}: {
  current: string;
  params: Params;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const buildLink = (sort: keyof typeof SORTS) => {
    const p = new URLSearchParams();
    if (params.q) p.set("q", params.q);
    if (params.type) p.set("type", params.type);
    if (params.category) p.set("category", params.category);
    if (params.country) p.set("country", params.country);
    if (params.bio) p.set("bio", params.bio);
    p.set("sort", sort);
    return `/annonces?${p.toString()}`;
  };

  const currentLabel =
    SORTS[current as keyof typeof SORTS]?.label ?? SORTS.recent.label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium transition hover:border-brand-300 hover:bg-brand-50"
      >
        <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
        {currentLabel}
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 min-w-56 rounded-xl border border-border bg-card p-1.5 shadow-2xl">
          {(Object.keys(SORTS) as (keyof typeof SORTS)[]).map((key) => {
            const item = SORTS[key];
            const Icon = item.icon;
            const active = current === key;
            return (
              <Link
                key={key}
                href={buildLink(key)}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-brand-100 font-semibold text-brand-700"
                    : "hover:bg-sand-100"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${active ? "text-brand-600" : "text-muted-foreground"}`}
                  strokeWidth={2}
                />
                {item.label}
                {active && (
                  <Check className="ml-auto h-4 w-4 text-brand-600" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
