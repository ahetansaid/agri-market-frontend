"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Flame } from "lucide-react";

// Positions approximatives des 54 pays africains (% de la carte 600x700)
const COUNTRIES: {
  code: string;
  name: string;
  x: number;
  y: number;
}[] = [
  // Afrique du Nord
  { code: "DZ", name: "Algérie", x: 38, y: 18 },
  { code: "EG", name: "Égypte", x: 62, y: 22 },
  { code: "LY", name: "Libye", x: 50, y: 22 },
  { code: "MA", name: "Maroc", x: 28, y: 16 },
  { code: "TN", name: "Tunisie", x: 47, y: 14 },
  { code: "SD", name: "Soudan", x: 60, y: 38 },
  { code: "EH", name: "Sahara Occ.", x: 22, y: 26 },
  // Afrique de l'Ouest
  { code: "MR", name: "Mauritanie", x: 25, y: 32 },
  { code: "ML", name: "Mali", x: 32, y: 36 },
  { code: "NE", name: "Niger", x: 45, y: 38 },
  { code: "SN", name: "Sénégal", x: 22, y: 40 },
  { code: "GM", name: "Gambie", x: 20, y: 41 },
  { code: "GW", name: "Guinée-Bissau", x: 21, y: 43 },
  { code: "GN", name: "Guinée", x: 26, y: 45 },
  { code: "SL", name: "Sierra Leone", x: 25, y: 48 },
  { code: "LR", name: "Libéria", x: 28, y: 50 },
  { code: "CI", name: "Côte d'Ivoire", x: 31, y: 49 },
  { code: "BF", name: "Burkina Faso", x: 36, y: 44 },
  { code: "GH", name: "Ghana", x: 35, y: 50 },
  { code: "TG", name: "Togo", x: 39, y: 50 },
  { code: "BJ", name: "Bénin", x: 41, y: 49 },
  { code: "NG", name: "Nigéria", x: 45, y: 48 },
  { code: "CV", name: "Cap-Vert", x: 14, y: 38 },
  // Afrique Centrale
  { code: "TD", name: "Tchad", x: 51, y: 40 },
  { code: "CF", name: "Centrafrique", x: 53, y: 47 },
  { code: "CM", name: "Cameroun", x: 48, y: 50 },
  { code: "GQ", name: "Guinée Équat.", x: 46, y: 54 },
  { code: "GA", name: "Gabon", x: 48, y: 56 },
  { code: "CG", name: "Congo", x: 51, y: 57 },
  { code: "CD", name: "RD Congo", x: 55, y: 60 },
  { code: "ST", name: "São Tomé", x: 44, y: 55 },
  { code: "AO", name: "Angola", x: 52, y: 70 },
  // Afrique de l'Est
  { code: "ET", name: "Éthiopie", x: 67, y: 46 },
  { code: "ER", name: "Érythrée", x: 66, y: 38 },
  { code: "DJ", name: "Djibouti", x: 70, y: 42 },
  { code: "SO", name: "Somalie", x: 75, y: 50 },
  { code: "SS", name: "Soudan du Sud", x: 60, y: 46 },
  { code: "KE", name: "Kenya", x: 67, y: 56 },
  { code: "UG", name: "Ouganda", x: 62, y: 55 },
  { code: "RW", name: "Rwanda", x: 60, y: 58 },
  { code: "BI", name: "Burundi", x: 60, y: 60 },
  { code: "TZ", name: "Tanzanie", x: 64, y: 63 },
  // Afrique Australe
  { code: "ZM", name: "Zambie", x: 58, y: 70 },
  { code: "ZW", name: "Zimbabwe", x: 60, y: 76 },
  { code: "MZ", name: "Mozambique", x: 65, y: 78 },
  { code: "MW", name: "Malawi", x: 62, y: 72 },
  { code: "NA", name: "Namibie", x: 52, y: 80 },
  { code: "BW", name: "Botswana", x: 56, y: 80 },
  { code: "ZA", name: "Afrique du Sud", x: 56, y: 87 },
  { code: "LS", name: "Lesotho", x: 58, y: 88 },
  { code: "SZ", name: "Eswatini", x: 61, y: 85 },
  // Océan Indien
  { code: "MG", name: "Madagascar", x: 78, y: 75 },
  { code: "MU", name: "Maurice", x: 86, y: 76 },
  { code: "SC", name: "Seychelles", x: 82, y: 60 },
  { code: "KM", name: "Comores", x: 73, y: 70 },
];

function levelFor(n: number, max: number): 0 | 1 | 2 | 3 {
  if (!n) return 0;
  if (max <= 1) return 3;
  const ratio = n / max;
  if (ratio >= 0.66) return 3;
  if (ratio >= 0.33) return 2;
  return 1;
}

const dotStyles = {
  0: "bg-sand-300 shadow-[0_0_0_3px_theme(colors.sand.200/40%)]",
  1: "bg-brand-200 shadow-[0_0_0_4px_theme(colors.brand.200/40%)]",
  2: "bg-brand-400 shadow-[0_0_0_5px_theme(colors.brand.400/40%)]",
  3: "bg-gradient-to-br from-brand-500 to-brand-700 shadow-[0_0_0_6px_theme(colors.brand.500/40%),_0_0_24px_theme(colors.brand.500/50%)]",
} as const;

export function AfricaMapSection({
  counts,
  activeCountriesCount,
}: {
  counts: Record<string, number>;
  activeCountriesCount: number;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const max = useMemo(
    () => Math.max(0, ...Object.values(counts)),
    [counts]
  );

  const topCountries = useMemo(
    () =>
      Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10),
    [counts]
  );

  const hoveredData = hovered
    ? {
        name: COUNTRIES.find((c) => c.code === hovered)?.name ?? hovered,
        count: counts[hovered] ?? 0,
      }
    : null;

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-gradient-to-b from-sand-50 to-sand-100 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-sand-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500 shadow-[0_0_8px_theme(colors.brand.500)]" />
            Géographie du marché
          </span>
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Le pouls de
            <br />
            <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
              l&apos;Afrique agricole.
            </em>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Une marketplace pour 54 pays. Survolez la carte pour voir
            l&apos;activité par pays — cliquez pour explorer les annonces
            locales.
          </p>
        </motion.header>

        {/* Stage */}
        <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Canvas */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative overflow-hidden rounded-3xl bg-card p-8 shadow-xl shadow-black/[0.06] ring-1 ring-border"
          >
            <div className="relative aspect-[600/700] w-full">
              {/* SVG silhouette */}
              <svg
                viewBox="0 0 600 700"
                className="absolute inset-0 h-full w-full"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient
                    id="africa-gradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#1c1917" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#0a0f1e" stopOpacity="0.04" />
                  </linearGradient>
                </defs>
                <path
                  d="M 230 60 Q 240 50 270 50 L 320 55 Q 360 60 400 75 L 440 95 Q 470 110 480 130 L 485 160 Q 488 180 495 200 L 510 230 Q 515 260 510 290 L 500 320 Q 485 350 470 380 L 460 410 Q 450 440 435 470 L 420 510 Q 405 545 380 575 L 350 605 Q 320 630 290 640 L 260 635 Q 245 625 240 605 L 230 580 Q 220 555 215 525 L 215 495 Q 220 465 215 435 L 195 415 Q 175 405 160 390 L 145 365 Q 135 340 130 315 L 125 285 Q 125 250 130 220 L 145 195 Q 165 170 175 145 L 190 115 Q 205 85 230 60 Z"
                  fill="url(#africa-gradient)"
                  stroke="#1c1917"
                  strokeWidth="1.5"
                  strokeOpacity="0.18"
                  strokeLinejoin="round"
                />
                <ellipse
                  cx="495"
                  cy="540"
                  rx="18"
                  ry="48"
                  fill="url(#africa-gradient)"
                  stroke="#1c1917"
                  strokeWidth="1.2"
                  strokeOpacity="0.18"
                />
              </svg>

              {/* Dots */}
              {COUNTRIES.map((c) => {
                const n = counts[c.code] ?? 0;
                const level = levelFor(n, max);
                return (
                  <Link
                    key={c.code}
                    href={n > 0 ? `/annonces?country=${c.code}` : "#"}
                    onMouseEnter={() => setHovered(c.code)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(c.code)}
                    onBlur={() => setHovered(null)}
                    style={{ left: `${c.x}%`, top: `${c.y}%` }}
                    className={`group/dot absolute -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-transform duration-200 hover:scale-150 focus-visible:scale-150 focus-visible:ring-2 focus-visible:ring-brand-500 ${
                      n === 0 ? "cursor-default" : "cursor-pointer"
                    }`}
                    aria-label={`${c.name} : ${n} annonce${n > 1 ? "s" : ""}`}
                  >
                    <span
                      className={`block rounded-full ${dotStyles[level]} ${
                        level >= 2 ? "animate-pulse" : ""
                      }`}
                      style={{
                        width: level === 3 ? 14 : level >= 1 ? 11 : 8,
                        height: level === 3 ? 14 : level >= 1 ? 11 : 8,
                      }}
                    />
                  </Link>
                );
              })}

              {/* Tooltip */}
              {hoveredData && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="pointer-events-none absolute z-20 flex items-center gap-2 rounded-lg bg-sand-900 px-3 py-2 text-sm font-semibold text-white shadow-2xl -translate-x-1/2 -translate-y-full"
                  style={{
                    left: `${COUNTRIES.find((c) => c.code === hovered)?.x ?? 50}%`,
                    top: `${(COUNTRIES.find((c) => c.code === hovered)?.y ?? 50) - 3}%`,
                  }}
                >
                  <span
                    className={`fi fi-${hovered?.toLowerCase()} h-3 w-4.5 rounded-sm`}
                  />
                  {hoveredData.name}
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      hoveredData.count > 0
                        ? "bg-brand-500/20 text-brand-300"
                        : "bg-white/10 text-white/60"
                    }`}
                  >
                    {hoveredData.count > 0
                      ? `${hoveredData.count} annonce${hoveredData.count > 1 ? "s" : ""}`
                      : "Pas encore d'annonces"}
                  </span>
                </motion.div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-full border border-border bg-background/50 px-4 py-2 text-xs backdrop-blur">
              <span className="font-semibold uppercase tracking-widest text-muted-foreground">
                Activité
              </span>
              <div className="flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${dotStyles[0]}`} />
                <span className={`h-3 w-3 rounded-full ${dotStyles[1]}`} />
                <span className={`h-3 w-3 rounded-full ${dotStyles[2]}`} />
                <span className={`h-3 w-3 rounded-full ${dotStyles[3]}`} />
              </div>
              <span className="text-brand-700 font-semibold">Forte</span>
            </div>
          </motion.div>

          {/* Panel */}
          <motion.aside
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            <div className="flex items-baseline gap-3 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <span className="font-display text-4xl font-bold tracking-tight">
                54
              </span>
              <span className="text-sm text-muted-foreground">
                pays accessibles
              </span>
            </div>
            <div className="flex items-baseline gap-3 rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border">
              <span className="font-display text-4xl font-bold tracking-tight bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                {activeCountriesCount}
              </span>
              <span className="text-sm text-muted-foreground">pays actifs</span>
            </div>

            {/* Top pays */}
            <div className="flex-1 rounded-2xl bg-gradient-to-br from-sand-900 to-sand-800 p-6 text-white shadow-2xl shadow-black/20">
              <h3 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold">
                <Flame className="h-5 w-5 text-brand-400" strokeWidth={2} />
                Top pays
              </h3>
              {topCountries.length > 0 ? (
                <ul className="flex flex-col gap-1">
                  {topCountries.map(([code, n]) => (
                    <li key={code}>
                      <Link
                        href={`/annonces?country=${code}`}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition hover:bg-white/5 hover:pl-4"
                      >
                        <span
                          className={`fi fi-${code.toLowerCase()} h-3.5 w-5 shrink-0 rounded-sm`}
                        />
                        <span className="flex-1 font-medium text-white/90">
                          {COUNTRIES.find((c) => c.code === code)?.name ?? code}
                        </span>
                        <span className="rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-2.5 py-0.5 font-display text-xs font-bold text-white">
                          {n}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-center text-sm text-white/50">
                  Aucune annonce active pour l&apos;instant
                </p>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
