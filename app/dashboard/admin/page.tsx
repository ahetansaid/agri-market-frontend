"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { FileText, ShieldCheck, CalendarDays, ArrowRight, Clock } from "lucide-react";

const MODULES = [
  {
    href: "/dashboard/admin/about",
    icon: FileText,
    title: "Page À propos",
    desc: "Éditer l'introduction, la vision, les perspectives, les valeurs et la mission.",
    ready: true,
  },
  {
    href: "/dashboard/admin/moderation",
    icon: ShieldCheck,
    title: "Modération des annonces",
    desc: "Valider ou rejeter les annonces en attente (double validation).",
    ready: true,
  },
  {
    href: "/dashboard/admin/events",
    icon: CalendarDays,
    title: "Événements",
    desc: "Créer, modifier et supprimer les salons et rencontres.",
    ready: true,
  },
];

export default function AdminHome() {
  const { user } = useAuth();

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Bonjour{" "}
          <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
            {user?.display_name || user?.username}
          </em>
        </h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Gérez le contenu et la modération de la plateforme.
        </p>
      </div>

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
    </>
  );
}
