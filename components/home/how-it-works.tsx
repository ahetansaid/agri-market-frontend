"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { fadeUp, stagger, inViewProps } from "@/lib/motion";
import { PlusCircle, Users, BadgeCheck, ArrowRight } from "lucide-react";

const STEPS = [
  {
    n: "01",
    icon: PlusCircle,
    tone: "orange",
    title: "Publiez votre annonce",
    text: "Créez une annonce gratuite en 3 minutes — photos, quantité, prix. Validée par notre équipe sous 24h.",
  },
  {
    n: "02",
    icon: Users,
    tone: "green",
    title: "Connectez-vous aux acheteurs",
    text: "Recevez des demandes vérifiées depuis 54 pays africains. En direct, sans intermédiaire ni commission cachée.",
  },
  {
    n: "03",
    icon: BadgeCheck,
    tone: "orange",
    title: "Vendez au juste prix",
    text: "Négociez, concluez, expédiez. Vous gardez 100 % de votre marge — zéro commission sur vos ventes.",
  },
] as const;

const tone = {
  orange: {
    badge: "bg-brand-100 text-brand-700 ring-brand-200",
    icon: "from-brand-500 to-brand-600",
    num: "text-brand-500/25",
  },
  green: {
    badge: "bg-harvest-100 text-harvest-700 ring-harvest-200",
    icon: "from-harvest-500 to-harvest-600",
    num: "text-harvest-500/25",
  },
} as const;

export function HowItWorks() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-sand-50 to-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <span className="eyebrow text-brand-600">Simple, direct, transparent</span>
          <h2 className="font-display mt-3 text-4xl font-medium tracking-tight sm:text-5xl">
            De la récolte à la vente,{" "}
            <em className="text-gradient-brand font-normal italic">
              en 3 étapes.
            </em>
          </h2>
        </header>

        <motion.div
          variants={stagger}
          {...inViewProps}
          className="relative grid gap-6 md:grid-cols-3"
        >
          {/* Ligne de liaison */}
          <div className="pointer-events-none absolute left-0 right-0 top-16 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block" />

          {STEPS.map((s) => {
            const t = tone[s.tone];
            const Icon = s.icon;
            return (
              <motion.div
                key={s.n}
                variants={fadeUp}
                className="relative rounded-3xl border border-border bg-card p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${t.icon}`}
                  >
                    <Icon className="h-7 w-7" strokeWidth={2} />
                  </span>
                  <span className={`font-display text-5xl font-bold ${t.num}`}>
                    {s.n}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 hover:shadow-brand-600/50"
          >
            Publier ma première annonce
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
