"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  ShoppingBag,
  UserCircle,
  Settings,
  LogOut,
  ShieldCheck,
  Star,
  Search,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { logout } from "@/lib/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string | number;
}

const PRODUCER_NAV: NavItem[] = [
  { href: "/dashboard/producer", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/dashboard/producer/announcements", label: "Mes annonces", icon: Package },
  { href: "/dashboard/producer/messages", label: "Messagerie", icon: MessageSquare },
  { href: "/dashboard/producer/ratings", label: "Mes avis", icon: Star },
  { href: "/dashboard/producer/profile", label: "Mon profil", icon: UserCircle },
];

const BUYER_NAV: NavItem[] = [
  { href: "/dashboard/buyer", label: "Vue d'ensemble", icon: LayoutDashboard },
  { href: "/dashboard/buyer/searches", label: "Mes recherches", icon: Search },
  { href: "/dashboard/buyer/watchlist", label: "Favoris", icon: ShoppingBag },
  { href: "/dashboard/buyer/messages", label: "Messagerie", icon: MessageSquare },
  { href: "/dashboard/buyer/profile", label: "Mon profil", icon: UserCircle },
];

export function DashboardShell({
  children,
  role = "producer",
}: {
  children: ReactNode;
  role?: "producer" | "buyer";
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, user, router, pathname]);

  if (isLoading || !user) {
    return (
      <main className="grid min-h-screen place-items-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
          <span className="text-sm text-muted-foreground">Chargement…</span>
        </div>
      </main>
    );
  }

  const nav = role === "producer" ? PRODUCER_NAV : BUYER_NAV;

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr] bg-sand-50">
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col border-r border-border/60 bg-background">
        <Link
          href="/"
          className="flex items-center gap-3 border-b border-border/60 px-6 py-5"
        >
          <div className="h-10 w-10 rounded-xl bg-white p-1 ring-1 ring-brand-200 shadow-sm">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="font-display text-base font-bold tracking-tight">
              Agri{" "}
              <em className="italic font-medium bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                Market
              </em>
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
              {role === "producer" ? "Espace producteur" : "Espace acheteur"}
            </div>
          </div>
        </Link>

        <nav className="flex-1 flex flex-col gap-1 p-4">
          {nav.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== `/dashboard/${role}` &&
                pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-gradient-to-r from-brand-50 to-brand-100/40 text-brand-700"
                    : "text-muted-foreground hover:bg-sand-100 hover:text-foreground"
                }`}
              >
                {active && (
                  <span className="absolute left-0 h-6 w-0.5 rounded-r-full bg-gradient-to-b from-brand-500 to-brand-700" />
                )}
                <Icon
                  className={`h-4 w-4 shrink-0 ${
                    active ? "text-brand-600" : "text-muted-foreground group-hover:text-brand-600"
                  }`}
                  strokeWidth={2}
                />
                <span className="flex-1">{item.label}</span>
                {item.badge !== undefined && (
                  <span className="rounded-full bg-brand-500/15 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-border/60 p-4">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-destructive/5 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" strokeWidth={2} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex flex-col min-h-screen">
        {/* Top banner user */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden border-b border-border/60 bg-gradient-to-br from-sand-900 via-sand-800 to-[#2a1a14] text-white"
        >
          <div className="pointer-events-none absolute -left-10 top-0 h-64 w-64 rounded-full bg-brand-600 opacity-30 blur-[80px]" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-brand-400 opacity-20 blur-[80px]" />

          <div className="relative mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-6">
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20 shadow-lg">
                {user.picture_url ? (
                  <Image
                    src={user.picture_url}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xl font-bold">
                    {(user.display_name || user.username)[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">
                  Bonjour
                </div>
                <div className="font-display text-2xl font-semibold leading-tight tracking-tight sm:text-3xl">
                  <em className="italic font-normal bg-gradient-to-br from-brand-200 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                    {user.display_name || user.username}
                  </em>
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-white/60">
                  {user.country_code && (
                    <span className="inline-flex items-center gap-1">
                      <span
                        className={`fi fi-${user.country_code.toLowerCase()} h-3 w-4 rounded-sm`}
                      />
                      {user.country_name}
                    </span>
                  )}
                  {user.rating_avg && (
                    <span className="inline-flex items-center gap-1">
                      <Star
                        className="h-3 w-3 fill-amber-400 text-amber-400"
                        strokeWidth={0}
                      />
                      {user.rating_avg} ({user.ratings_count})
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-harvest-300">
                    <ShieldCheck className="h-3 w-3" />
                    Vérifié
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2">
              <Link
                href={
                  role === "producer"
                    ? "/dashboard/producer/announcements/new"
                    : "/annonces"
                }
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold shadow-lg shadow-brand-700/25 transition hover:-translate-y-0.5"
              >
                {role === "producer" ? (
                  <>
                    <Package className="h-4 w-4" />
                    Publier
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4" />
                    Explorer
                  </>
                )}
              </Link>
              <Link
                href="/dashboard/producer/profile"
                aria-label="Paramètres"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/5 backdrop-blur transition hover:bg-white/10"
              >
                <Settings className="h-4 w-4" strokeWidth={2} />
              </Link>
            </div>
          </div>
        </motion.header>

        {/* Content */}
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
          {children}
        </div>
      </div>
    </div>
  );
}
