"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, TrendingUp } from "lucide-react";
import { AFRICA_GEO, AFRICA_VIEWBOX } from "@/lib/content/africa-geo";

/** Couleur « chaleur » : gris (inactif) → vert clair → orange vif (forte activité). */
function heat(n: number, max: number): string {
  if (!n) return "#e7e1d4";
  const t = Math.min(1, n / max);
  const h = 140 + (16 - 140) * t;
  const s = 46 + (86 - 46) * t;
  const l = 72 + (48 - 72) * t;
  return `hsl(${h} ${s}% ${l}%)`;
}

const W = AFRICA_VIEWBOX.w;
const H = AFRICA_VIEWBOX.h;

export function AfricaMapInteractive({
  counts,
}: {
  counts: Record<string, number>;
}) {
  const router = useRouter();
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ code: string; x: number; y: number } | null>(
    null,
  );

  // Normalise les clés en ISO2 majuscule.
  const C = useMemo(() => {
    const m: Record<string, number> = {};
    for (const [k, v] of Object.entries(counts)) m[k.toUpperCase()] = v;
    return m;
  }, [counts]);

  const max = useMemo(() => Math.max(1, ...Object.values(C)), [C]);
  const geoByCode = useMemo(
    () => Object.fromEntries(AFRICA_GEO.map((c) => [c.code, c])),
    [],
  );
  const activeCount = Object.values(C).filter((n) => n > 0).length;
  const featured = useMemo(
    () =>
      AFRICA_GEO.filter((c) => (C[c.code] ?? 0) > 0)
        .sort((a, b) => (C[b.code] ?? 0) - (C[a.code] ?? 0))
        .slice(0, 8),
    [C, geoByCode],
  );
  const featuredCodes = new Set(featured.slice(0, 6).map((c) => c.code));

  const go = (code: string) => router.push(`/annonces?country=${code}`);
  const onMove = (e: React.MouseEvent, code: string) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    setHover({ code, x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const hoveredName = hover ? geoByCode[hover.code]?.name : null;
  const hoveredCount = hover ? C[hover.code] ?? 0 : 0;

  return (
    <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
      {/* CARTE */}
      <div
        ref={wrapRef}
        className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-white to-sand-100 p-3 shadow-sm sm:p-4"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label="Carte d'Afrique — activité par pays"
        >
          {AFRICA_GEO.map((c) => {
            const n = C[c.code] ?? 0;
            return (
              <path
                key={c.code}
                d={c.d}
                fill={heat(n, max)}
                stroke="#ffffff"
                strokeWidth={0.8}
                onMouseMove={(e) => onMove(e, c.code)}
                onMouseLeave={() => setHover(null)}
                onClick={() => go(c.code)}
                className="cursor-pointer [stroke-linejoin:round] transition duration-150 hover:brightness-105 hover:[stroke:#0f172a] hover:[stroke-width:1.4]"
              />
            );
          })}
        </svg>

        {/* Marqueurs pulsés — pays en vedette */}
        {AFRICA_GEO.filter((c) => featuredCodes.has(c.code)).map((c) => (
          <span
            key={c.code}
            className="pointer-events-none absolute"
            style={{ left: `${(c.cx / W) * 100}%`, top: `${(c.cy / H) * 100}%` }}
          >
            <span className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-brand-500 opacity-50" />
            <span className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-600 shadow ring-2 ring-white" />
          </span>
        ))}

        {/* Tooltip */}
        {hover && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[135%] whitespace-nowrap rounded-lg bg-sand-900 px-2.5 py-1.5 text-xs text-white shadow-lg"
            style={{ left: hover.x, top: hover.y }}
          >
            <span className="font-semibold">{hoveredName}</span>
            <span className="ml-1.5 text-white/70">
              {hoveredCount > 0
                ? `${hoveredCount} annonce${hoveredCount > 1 ? "s" : ""}`
                : "Pas encore d'annonces"}
            </span>
          </div>
        )}
      </div>

      {/* PANNEAU */}
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="font-display text-3xl font-bold tracking-tight text-brand-700">
              54
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Pays accessibles
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="font-display text-3xl font-bold tracking-tight text-harvest-600">
              {activeCount}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Pays actifs
            </div>
          </div>
        </div>

        {/* Légende */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Activité
          </div>
          <div
            className="h-2.5 w-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #e7e1d4 0%, hsl(140 46% 72%) 30%, hsl(70 60% 58%) 60%, hsl(16 86% 48%) 100%)",
            }}
          />
          <div className="mt-1.5 flex justify-between text-[11px] text-muted-foreground">
            <span>Aucune</span>
            <span>Forte</span>
          </div>
        </div>

        {/* Top pays */}
        <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <TrendingUp className="h-4 w-4 text-brand-600" strokeWidth={2.2} />
            Pays en vedette
          </div>
          {featured.length === 0 ? (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              Aucune annonce active pour l'instant.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {featured.map((c) => (
                <li key={c.code}>
                  <button
                    type="button"
                    onClick={() => go(c.code)}
                    className="group flex w-full items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-secondary"
                  >
                    <span
                      className={`fi fi-${c.code.toLowerCase()} h-5 w-7 shrink-0 rounded-sm shadow-sm ring-1 ring-border`}
                    />
                    <span className="flex-1 truncate text-sm font-medium">
                      {c.name}
                    </span>
                    <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
                      {C[c.code]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
