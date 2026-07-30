"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  ShieldCheck,
  CalendarDays,
  Users,
  ExternalLink,
  LogOut,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { logout } from "@/lib/auth";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  soon?: boolean;
}

const NAV: NavItem[] = [
  { href: "/dashboard/admin", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/dashboard/admin/about", label: "Page À propos", icon: FileText },
  { href: "/dashboard/admin/moderation", label: "Modération", icon: ShieldCheck },
  { href: "/dashboard/admin/events", label: "Événements", icon: CalendarDays },
  { href: "/dashboard/admin/users", label: "Utilisateurs", icon: Users },
];

/**
 * Coque du back-office admin : interface DÉDIÉE (sidebar sombre, thème
 * distinct du site public). Intègre la garde d'accès `is_staff`.
 */
export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Garde d'accès staff.
  useEffect(() => {
    if (isLoading) return;
    if (!user) router.replace("/login?next=/dashboard/admin");
    else if (!user.is_staff) router.replace("/dashboard/producer");
  }, [isLoading, user, router]);

  // Ferme le tiroir mobile au changement de page.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isLoading || !user || !user.is_staff) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#0d1117]">
        <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
      </div>
    );
  }

  const sidebar = (
    <div className="flex h-full flex-col bg-[#0d1117] text-white">
      {/* Brand */}
      <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-white p-1 ring-1 ring-white/20">
          <Image
            src="/logo.png"
            alt=""
            width={28}
            height={28}
            className="h-full w-full object-contain"
          />
        </div>
        <div>
          <div className="font-display text-sm font-bold leading-tight">
            Back-office
          </div>
          <div className="text-[10px] uppercase tracking-widest text-brand-400">
            Administration
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV.map((item) => {
          const active =
            item.href === "/dashboard/admin"
              ? pathname === item.href
              : pathname.startsWith(item.href);
          const Icon = item.icon;
          const cls = `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
            active
              ? "bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/30"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          }`;
          if (item.soon) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/30"
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="flex-1">{item.label}</span>
                <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider">
                  Bientôt
                </span>
              </div>
            );
          }
          return (
            <Link key={item.href} href={item.href} className={cls}>
              <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span className="flex-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 p-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
        >
          <ExternalLink className="h-4 w-4" strokeWidth={2} />
          Retour au site
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition hover:bg-destructive/15 hover:text-destructive"
        >
          <LogOut className="h-4 w-4" strokeWidth={2} />
          Déconnexion
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-sand-100 lg:grid lg:grid-cols-[260px_1fr]">
      {/* Sidebar desktop */}
      <aside className="hidden lg:block">
        <div className="sticky top-0 h-screen">{sidebar}</div>
      </aside>

      {/* Topbar mobile */}
      <header className="flex items-center justify-between border-b border-black/10 bg-[#0d1117] px-4 py-3 text-white lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu"
          className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10"
        >
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-display text-sm font-bold">Back-office</span>
        <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-500/20 text-xs font-bold text-brand-300">
          {(user.display_name || user.username)[0]?.toUpperCase()}
        </div>
      </header>

      {/* Tiroir mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] shadow-2xl">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
              className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-lg text-white/70 hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      {/* Contenu */}
      <div className="min-w-0">
        {/* Topbar desktop */}
        <div className="hidden items-center justify-between border-b border-black/5 bg-white px-8 py-4 lg:flex">
          <span className="text-sm font-semibold text-muted-foreground">
            Administration
          </span>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium">
              {user.display_name || user.username}
            </span>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 text-sm font-bold text-white">
              {(user.display_name || user.username)[0]?.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </div>
    </div>
  );
}
