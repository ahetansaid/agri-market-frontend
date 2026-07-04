"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Plus,
  Star,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  fetchMyAnnouncements,
  fetchMyRatings,
  type MyAnnouncementsPayload,
  type MyRatingsPayload,
} from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export default function ProducerDashboard() {
  const { user } = useAuth();
  const [anns, setAnns] = useState<MyAnnouncementsPayload | null>(null);
  const [ratings, setRatings] = useState<MyRatingsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      fetchMyAnnouncements().catch(() => null),
      fetchMyRatings().catch(() => null),
    ]).then(([a, r]) => {
      setAnns(a);
      setRatings(r);
      setLoading(false);
    });
  }, [user]);

  return (
    <DashboardShell role="producer">
      {/* KPI cards */}
      <section className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="Annonces actives"
          value={anns?.counts.approved ?? 0}
          loading={loading}
          tone="brand"
        />
        <StatCard
          icon={Clock}
          label="En validation"
          value={anns?.counts.pending ?? 0}
          loading={loading}
          tone="harvest"
        />
        <StatCard
          icon={Star}
          label="Note moyenne"
          value={
            ratings?.summary.avg !== null && ratings?.summary.avg !== undefined
              ? ratings.summary.avg
              : "—"
          }
          sub={
            ratings?.summary.count
              ? `${ratings.summary.count} avis`
              : "Aucun avis"
          }
          loading={loading}
          tone="gold"
        />
        <StatCard
          icon={TrendingUp}
          label="Vues"
          value="—"
          sub="À venir"
          loading={false}
          tone="sky"
        />
      </section>

      {/* Content 2 col : main + aside */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Recent announcements */}
        <div className="rounded-3xl bg-card ring-1 ring-border shadow-sm overflow-hidden">
          <header className="flex items-center justify-between border-b border-border px-6 py-5">
            <div>
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Vos annonces récentes
              </h2>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Aperçu de vos publications les plus récentes.
              </p>
            </div>
            <Link
              href="/dashboard/producer/announcements/new"
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:shadow-md transition"
            >
              <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              Publier
            </Link>
          </header>
          <div>
            {loading ? (
              <RecentSkeleton />
            ) : anns && anns.counts.total > 0 ? (
              <RecentList anns={anns} />
            ) : (
              <EmptyState
                icon={Package}
                title="Aucune annonce publiée pour l'instant"
                desc="Publiez votre première annonce en moins de 3 minutes."
                cta={{
                  href: "/dashboard/producer/announcements/new",
                  label: "Publier une annonce",
                }}
              />
            )}
          </div>
        </div>

        {/* Aside : recent ratings */}
        <aside className="rounded-3xl bg-gradient-to-br from-sand-900 to-sand-800 text-white p-6 shadow-xl overflow-hidden relative">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-500/25 blur-2xl" />
          <div className="relative">
            <h3 className="font-display text-lg font-semibold flex items-center gap-2">
              <Star
                className="h-4 w-4 fill-amber-400 text-amber-400"
                strokeWidth={0}
              />
              Vos derniers avis
            </h3>
            <div className="mt-4">
              {loading ? (
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-16 rounded-xl bg-white/5 animate-pulse"
                    />
                  ))}
                </div>
              ) : ratings && ratings.results.length > 0 ? (
                <ul className="space-y-3">
                  {ratings.results.slice(0, 3).map((r) => (
                    <motion.li
                      key={r.id}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="rounded-xl bg-white/5 p-3 backdrop-blur"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-brand-300">
                          {r.author_name}
                        </span>
                        <span className="inline-flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`h-3 w-3 ${
                                s <= r.stars
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-white/20 fill-transparent"
                              }`}
                              strokeWidth={0}
                            />
                          ))}
                        </span>
                      </div>
                      {r.comment && (
                        <p className="mt-1.5 text-xs text-white/70 italic line-clamp-2">
                          &laquo; {r.comment} &raquo;
                        </p>
                      )}
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm italic text-white/50">
                  Aucun avis pour l&apos;instant. Concluez votre première
                  transaction pour recevoir vos premiers avis.
                </p>
              )}
            </div>
            <Link
              href="/dashboard/producer/ratings"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-300 hover:text-brand-200"
            >
              Voir tous les avis
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>

      {/* Bottom : quick actions */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <QuickAction
          icon={Package}
          title="Publier une annonce"
          desc="Ajoutez un produit à votre catalogue en 3 min."
          href="/dashboard/producer/announcements/new"
        />
        <QuickAction
          icon={MessageCircle}
          title="Messagerie"
          desc="Répondez aux acheteurs intéressés."
          href="/dashboard/producer/messages"
        />
        <QuickAction
          icon={CheckCircle2}
          title="Certifications"
          desc="Ajoutez vos certifications bio, coopérative..."
          href="/dashboard/producer/profile#certifications"
        />
      </section>
    </DashboardShell>
  );
}

/* ============================================================
   Helpers
   ============================================================ */

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  loading,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: string | number;
  sub?: string;
  loading?: boolean;
  tone: "brand" | "harvest" | "gold" | "sky";
}) {
  const tones = {
    brand: "from-brand-500 to-brand-700 text-white",
    harvest: "from-harvest-500 to-harvest-700 text-white",
    gold: "from-amber-400 to-amber-600 text-white",
    sky: "from-sky-500 to-sky-700 text-white",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl bg-card ring-1 ring-border shadow-sm p-5 hover:shadow-md transition"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          {loading ? (
            <div className="mt-3 h-8 w-16 rounded bg-sand-200 animate-pulse" />
          ) : (
            <div className="mt-2 font-display text-3xl font-bold leading-none tracking-tight">
              {value}
            </div>
          )}
          {sub && (
            <div className="mt-1 text-xs text-muted-foreground">{sub}</div>
          )}
        </div>
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${tones[tone]} shadow-md`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.5} />
        </div>
      </div>
    </motion.div>
  );
}

function RecentSkeleton() {
  return (
    <div className="divide-y divide-border">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4 p-4">
          <div className="h-12 w-12 rounded-lg bg-sand-200 animate-pulse" />
          <div className="flex-1">
            <div className="h-3 w-40 rounded bg-sand-200 animate-pulse" />
            <div className="mt-2 h-2.5 w-24 rounded bg-sand-100 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentList({ anns }: { anns: MyAnnouncementsPayload }) {
  const all = [
    ...(anns.approved as { id: number; title: string; type_display: string; image_url: string | null; quantity: number | null; unit: string | null }[]).map(
      (a) => ({ ...a, status: "approved" as const })
    ),
    ...(anns.pending_first as { id: number; title: string; type_display: string; image_url: string | null; quantity: number | null; unit: string | null }[]).map(
      (a) => ({ ...a, status: "pending" as const })
    ),
    ...(anns.pending_second as { id: number; title: string; type_display: string; image_url: string | null; quantity: number | null; unit: string | null }[]).map(
      (a) => ({ ...a, status: "pending" as const })
    ),
    ...(anns.draft as { id: number; title: string; type_display: string; image_url: string | null; quantity: number | null; unit: string | null }[]).map(
      (a) => ({ ...a, status: "draft" as const })
    ),
  ].slice(0, 6);

  const statusStyles = {
    approved: {
      dot: "bg-harvest-500",
      label: "En ligne",
      color: "text-harvest-700",
    },
    pending: {
      dot: "bg-amber-500",
      label: "En validation",
      color: "text-amber-700",
    },
    draft: {
      dot: "bg-sand-400",
      label: "Brouillon",
      color: "text-sand-600",
    },
    rejected: {
      dot: "bg-destructive",
      label: "Rejetée",
      color: "text-destructive",
    },
    expired: {
      dot: "bg-sand-500",
      label: "Expirée",
      color: "text-sand-600",
    },
  };

  return (
    <ul className="divide-y divide-border">
      {all.map((a) => {
        const s = statusStyles[a.status];
        return (
          <li key={a.id}>
            <Link
              href={`/dashboard/producer/announcements/${a.id}`}
              className="group flex items-center gap-4 p-4 transition hover:bg-sand-50/70"
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                {a.image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={a.image_url}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center text-sand-500">
                    <Package className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-display font-semibold tracking-tight truncate">
                  {a.title}
                </div>
                <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                  <span className={`inline-flex items-center gap-1 font-semibold ${s.color}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                    {s.label}
                  </span>
                  <span>·</span>
                  <span>{a.type_display}</span>
                  {a.quantity && (
                    <>
                      <span>·</span>
                      <span>
                        {a.quantity.toLocaleString("fr-FR")}{" "}
                        <em className="italic text-sand-500">{a.unit}</em>
                      </span>
                    </>
                  )}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-brand-600" />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function EmptyState({
  icon: Icon,
  title,
  desc,
  cta,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  cta: { href: string; label: string };
}) {
  return (
    <div className="p-12 text-center">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-700">
        <Icon className="h-8 w-8" strokeWidth={1.5} />
      </div>
      <h3 className="font-display text-xl font-semibold">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        {desc}
      </p>
      <Link
        href={cta.href}
        className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
      >
        <Plus className="h-4 w-4" />
        {cta.label}
      </Link>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  desc,
  href,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group relative overflow-hidden rounded-2xl bg-card ring-1 ring-border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:ring-brand-300"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-500/8 blur-2xl transition group-hover:bg-brand-500/15" />
      <div className="relative">
        <div className="mb-3 inline-grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-100 to-brand-200 text-brand-700">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <h3 className="font-display font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{desc}</p>
        <div className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 transition group-hover:gap-2">
          Y aller
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}

// Silence unused import (XCircle reserved for future rejected empty state)
void XCircle;
