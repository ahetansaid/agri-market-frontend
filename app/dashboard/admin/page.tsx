"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { AdminGuard } from "@/components/admin/admin-guard";
import {
  FileText,
  Package,
  CalendarDays,
  ArrowRight,
  ShieldCheck,
  Clock,
} from "lucide-react";

const MODULES = [
  {
    href: "/dashboard/admin/about",
    icon: FileText,
    title: "Page À propos",
    desc: "Éditer l'introduction, la vision, les perspectives, les valeurs et la mission.",
    ready: true,
  },
  {
    href: "#",
    icon: Package,
    title: "Modération des annonces",
    desc: "Valider ou rejeter les annonces en attente de publication.",
    ready: false,
  },
  {
    href: "#",
    icon: CalendarDays,
    title: "Événements",
    desc: "Créer et gérer les salons et rencontres.",
    ready: false,
  },
];

export default function AdminHome() {
  return (
    <AdminGuard>
      <Header />
      <main className="flex-1 bg-sand-50">
        {/* Hero */}
        <section className="relative overflow-hidden bg-sand-900 text-white">
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand-600 opacity-25 blur-[100px]" />
          <div className="relative mx-auto max-w-5xl px-5 py-12 sm:px-6 sm:py-16">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" />
              Administration
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Back-office
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/70">
              Gérez le contenu et la modération de la plateforme.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => {
              const Icon = m.icon;
              const inner = (
                <>
                  <div className="mb-4 inline-grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
                    <Icon className="h-6 w-6" strokeWidth={2} />
                  </div>
                  <h2 className="font-display text-lg font-semibold tracking-tight">
                    {m.title}
                  </h2>
                  <p className="mt-1.5 text-sm text-muted-foreground">{m.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                    {m.ready ? (
                      <>
                        Ouvrir
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        Bientôt
                      </span>
                    )}
                  </div>
                </>
              );
              return m.ready ? (
                <Link
                  key={m.title}
                  href={m.href}
                  className="group rounded-3xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl"
                >
                  {inner}
                </Link>
              ) : (
                <div
                  key={m.title}
                  className="rounded-3xl border border-dashed border-border bg-card/60 p-6 opacity-70"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </AdminGuard>
  );
}
