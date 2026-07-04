"use client";

import Link from "next/link";
import {
  Tag,
  Grid3x3,
  Globe,
  Leaf,
} from "lucide-react";
import type { Category } from "@/lib/api";

const AFRICAN_COUNTRIES = [
  { code: "DZ", name: "Algérie" },
  { code: "AO", name: "Angola" },
  { code: "BJ", name: "Bénin" },
  { code: "BW", name: "Botswana" },
  { code: "BF", name: "Burkina Faso" },
  { code: "BI", name: "Burundi" },
  { code: "CM", name: "Cameroun" },
  { code: "CV", name: "Cap-Vert" },
  { code: "CF", name: "Centrafrique" },
  { code: "TD", name: "Tchad" },
  { code: "KM", name: "Comores" },
  { code: "CG", name: "Congo" },
  { code: "CD", name: "RD Congo" },
  { code: "CI", name: "Côte d'Ivoire" },
  { code: "DJ", name: "Djibouti" },
  { code: "EG", name: "Égypte" },
  { code: "GQ", name: "Guinée Équatoriale" },
  { code: "ER", name: "Érythrée" },
  { code: "SZ", name: "Eswatini" },
  { code: "ET", name: "Éthiopie" },
];

interface Current {
  type?: string;
  category?: string;
  country?: string;
  bio?: boolean;
  q?: string;
  sort?: string;
}

export function ListingFilters({
  categories,
  current,
}: {
  categories: Category[];
  current: Current;
}) {
  const buildLink = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams();
    if (current.q) params.set("q", current.q);
    if (current.sort) params.set("sort", current.sort);
    if (current.type) params.set("type", current.type);
    if (current.category) params.set("category", current.category);
    if (current.country) params.set("country", current.country);
    if (current.bio) params.set("bio", "1");
    Object.entries(updates).forEach(([k, v]) => {
      if (v === undefined) params.delete(k);
      else params.set(k, v);
    });
    const qs = params.toString();
    return `/annonces${qs ? "?" + qs : ""}`;
  };

  return (
    <aside className="hidden lg:block sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
      {/* Type */}
      <FilterSection icon={Tag} title="Type d'annonce">
        <ul className="space-y-0.5">
          {[
            { key: undefined, label: "Tous" },
            { key: "vente", label: "Vente" },
            { key: "achat", label: "Achat" },
            { key: "autre", label: "Autre" },
          ].map((t) => (
            <FilterLink
              key={t.label}
              href={buildLink({ type: t.key })}
              active={current.type === t.key}
            >
              {t.label}
            </FilterLink>
          ))}
        </ul>
      </FilterSection>

      {/* Filières */}
      <FilterSection icon={Grid3x3} title="Filières">
        <ul className="space-y-0.5 max-h-60 overflow-y-auto pr-1">
          {categories.slice(0, 12).map((cat) => (
            <FilterLink
              key={cat.id}
              href={buildLink({ category: String(cat.id) })}
              active={current.category === String(cat.id)}
              count={cat.annonces_count}
            >
              {cat.name}
            </FilterLink>
          ))}
        </ul>
      </FilterSection>

      {/* Pays */}
      <FilterSection icon={Globe} title="Pays">
        <ul className="space-y-0.5 max-h-60 overflow-y-auto pr-1">
          {AFRICAN_COUNTRIES.slice(0, 20).map((c) => (
            <FilterLink
              key={c.code}
              href={buildLink({ country: c.code })}
              active={current.country === c.code}
              flag={c.code}
            >
              {c.name}
            </FilterLink>
          ))}
        </ul>
      </FilterSection>

      {/* Bio */}
      <FilterSection icon={Leaf} title="Qualité" last>
        <ul className="space-y-0.5">
          <FilterLink
            href={buildLink({ bio: "1" })}
            active={current.bio === true}
          >
            Bio uniquement
          </FilterLink>
        </ul>
      </FilterSection>
    </aside>
  );
}

function FilterSection({
  icon: Icon,
  title,
  children,
  last,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <div
      className={`${
        last ? "" : "mb-5 border-b border-border pb-5"
      }`}
    >
      <h3 className="mb-3 flex items-center gap-2 font-display text-sm font-semibold tracking-tight text-foreground">
        <Icon className="h-4 w-4 text-brand-600" strokeWidth={2} />
        {title}
      </h3>
      {children}
    </div>
  );
}

function FilterLink({
  href,
  active,
  children,
  count,
  flag,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
  count?: number;
  flag?: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className={`flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm transition ${
          active
            ? "bg-brand-100 font-semibold text-brand-700"
            : "text-muted-foreground hover:bg-sand-100 hover:text-foreground"
        }`}
      >
        <span className="flex items-center gap-2 truncate">
          {flag && (
            <span
              className={`fi fi-${flag.toLowerCase()} h-3 w-4 shrink-0 rounded-sm`}
            />
          )}
          <span className="truncate">{children}</span>
        </span>
        {count !== undefined && (
          <span
            className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
              active
                ? "bg-brand-200 text-brand-700"
                : "bg-sand-100 text-muted-foreground"
            }`}
          >
            {count}
          </span>
        )}
      </Link>
    </li>
  );
}
