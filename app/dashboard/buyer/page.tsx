"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Search,
  ShoppingBag,
  MessageCircle,
  Bell,
  ArrowRight,
  Sparkles,
  MapPin,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { useAuth } from "@/lib/auth-context";
import { useT } from "@/lib/i18n/client";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { t, locale } = useT();

  return (
    <DashboardShell role="buyer">
      {/* Welcome message */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 rounded-3xl bg-gradient-to-br from-brand-50 via-brand-100/40 to-sand-50 p-8 ring-1 ring-brand-200/60"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/60 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-brand-700 ring-1 ring-brand-200 backdrop-blur">
              <Sparkles className="h-3 w-3" strokeWidth={2.5} />
              {t("dash.buyerSpace")}
            </span>
            <h2 className="font-display text-3xl font-semibold tracking-tight">
              {t("dash.bReady")}{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                {user?.first_name || user?.username} ?
              </em>
            </h2>
            <p className="mt-2 max-w-lg text-sm text-muted-foreground">
              {t("dash.bSub")}
            </p>
          </div>
          <Link
            href="/annonces"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5"
          >
            {t("dash.exploreMarket")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.section>

      {/* KPI cards */}
      <section className="mb-8 grid gap-4 grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Search}
          label={t("dash.bStatSearches")}
          value={0}
          tone="brand"
        />
        <StatCard
          icon={ShoppingBag}
          label={t("dash.bStatFavorites")}
          value={0}
          tone="harvest"
        />
        <StatCard
          icon={MessageCircle}
          label={t("dash.bStatConversations")}
          value={0}
          tone="sky"
        />
        <StatCard
          icon={Bell}
          label={t("dash.bStatAlerts")}
          value={0}
          tone="gold"
        />
      </section>

      {/* Content 2 col */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Placeholder : saved searches / recos */}
        <div className="rounded-3xl bg-card ring-1 ring-border shadow-sm p-8">
          <h2 className="font-display text-xl font-semibold tracking-tight">
            {t("dash.bRecos")}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {t("dash.bRecosSub")}
          </p>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {[
              {
                emoji: "🌾",
                title: "Mil sahélien",
                sub: "Burkina Faso · Bio",
              },
              {
                emoji: "🍫",
                title: "Cacao CI",
                sub: "Côte d'Ivoire · Premium",
              },
              {
                emoji: "🌿",
                title: "Maraîchage",
                sub: "Togo · Local",
              },
            ].map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl bg-gradient-to-br from-sand-50 to-sand-100/60 p-4 ring-1 ring-border transition hover:-translate-y-1 hover:shadow-md hover:ring-brand-300"
              >
                <div className="mb-2 text-3xl">{r.emoji}</div>
                <div className="font-display font-semibold tracking-tight">
                  {r.title}
                </div>
                <div className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                  {r.sub}
                </div>
              </motion.div>
            ))}
          </div>

          <Link
            href="/annonces"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            {t("dash.bSeeAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Aside : profile summary */}
        <aside className="rounded-3xl bg-gradient-to-br from-sand-900 to-sand-800 text-white p-6 shadow-xl relative overflow-hidden">
          <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-brand-500/25 blur-2xl" />
          <div className="relative">
            <h3 className="font-display text-lg font-semibold">
              {t("dash.bYourProfile")}
            </h3>
            <div className="mt-3 space-y-2 text-sm">
              <ProfileRow label={t("dash.rowName")} value={user?.display_name || "—"} />
              <ProfileRow label="Email" value={user?.email || "—"} />
              {user?.country_name && (
                <ProfileRow
                  label={t("dash.rowCountry")}
                  value={
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-brand-400" />
                      {user.country_name}
                    </span>
                  }
                />
              )}
              {user?.ville && <ProfileRow label={t("form.city")} value={user.ville} />}
              <ProfileRow
                label={t("dash.memberSince")}
                value={
                  user?.date_joined
                    ? new Date(user.date_joined).toLocaleDateString(locale, {
                        month: "long",
                        year: "numeric",
                      })
                    : "—"
                }
              />
            </div>
            <Link
              href="/dashboard/buyer/profile"
              className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-300 hover:text-brand-200"
            >
              {t("dash.completeProfile")}
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </aside>
      </div>
    </DashboardShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number | string;
  tone: "brand" | "harvest" | "sky" | "gold";
}) {
  const tones = {
    brand: "from-brand-500 to-brand-700 text-white",
    harvest: "from-harvest-500 to-harvest-700 text-white",
    sky: "from-sky-500 to-sky-700 text-white",
    gold: "from-amber-400 to-amber-600 text-white",
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card ring-1 ring-border shadow-sm p-5"
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {label}
          </div>
          <div className="mt-2 font-display text-3xl font-bold tracking-tight">
            {value}
          </div>
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

function ProfileRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-white/5 pb-1.5">
      <span className="text-[10px] uppercase tracking-widest text-white/50">
        {label}
      </span>
      <span className="text-right text-white/90 truncate max-w-[60%]">
        {value}
      </span>
    </div>
  );
}
