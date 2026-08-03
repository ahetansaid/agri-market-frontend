"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { GUIDE_SECTIONS } from "@/lib/content/guide";
import {
  UserPlus,
  PlusCircle,
  Search,
  MessageSquare,
  TrendingUp,
  ShieldCheck,
  Check,
  Lightbulb,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  compte: UserPlus,
  publier: PlusCircle,
  trouver: Search,
  contacter: MessageSquare,
  vendre: TrendingUp,
  securite: ShieldCheck,
};

export function GuideView() {
  const [active, setActive] = useState(GUIDE_SECTIONS[0].id);
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Scroll-spy : surligne la section visible.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    GUIDE_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  // Barre de progression de lecture.
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current;
      if (!el) return;
      const start = el.getBoundingClientRect().top + window.scrollY;
      const end = start + el.offsetHeight - window.innerHeight;
      const p = (window.scrollY - start) / Math.max(1, end - start);
      setProgress(Math.min(100, Math.max(0, p * 100)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      {/* Barre de progression */}
      <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-harvest-500 transition-[width] duration-150"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[250px_1fr]">
          {/* Sommaire sticky */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Sommaire
            </p>
            <nav>
              <ul className="space-y-1">
                {GUIDE_SECTIONS.map((s) => {
                  const Icon = ICONS[s.id] ?? Check;
                  const on = active === s.id;
                  return (
                    <li key={s.id}>
                      <button
                        type="button"
                        onClick={() => jump(s.id)}
                        className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition ${
                          on
                            ? "bg-brand-50 font-semibold text-brand-700"
                            : "text-foreground/70 hover:bg-white hover:text-brand-700"
                        }`}
                      >
                        <span
                          className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg transition ${
                            on
                              ? "bg-brand-600 text-white shadow-sm"
                              : "bg-secondary text-brand-600 group-hover:bg-brand-100"
                          }`}
                        >
                          <Icon className="h-4 w-4" strokeWidth={2} />
                        </span>
                        <span className="flex-1">{s.title}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          {/* Sections */}
          <div ref={ref} className="space-y-14">
            {GUIDE_SECTIONS.map((s) => {
              const Icon = ICONS[s.id] ?? Check;
              return (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-sm">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <div>
                      <span className="font-mono text-xs font-bold text-brand-500">
                        {s.n}
                      </span>
                      <h2 className="font-display text-2xl font-semibold tracking-tight">
                        {s.title}
                      </h2>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.intro}
                  </p>

                  <ol className="mt-6 space-y-3">
                    {s.steps.map((step, i) => (
                      <li
                        key={step.t}
                        className="flex gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition hover:border-brand-200"
                      >
                        <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand-50 font-display text-sm font-bold text-brand-600">
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-semibold text-foreground">{step.t}</div>
                          <p className="mt-1 text-sm leading-relaxed text-foreground/75">
                            {step.d}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>

                  {s.tip && (
                    <div className="mt-4 flex gap-3 rounded-2xl border border-harvest-200 bg-harvest-50 p-4">
                      <Lightbulb
                        className="mt-0.5 h-5 w-5 shrink-0 text-harvest-600"
                        strokeWidth={2}
                      />
                      <div>
                        <div className="font-semibold text-harvest-800">{s.tip.t}</div>
                        <p className="mt-1 text-sm leading-relaxed text-harvest-900/80">
                          {s.tip.d}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}

            {/* CTA final */}
            <div className="overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-white shadow-lg sm:p-10">
              <h2 className="font-display text-2xl font-semibold tracking-tight">
                Prêt à vous lancer ?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-white/80">
                Vous avez tout pour démarrer. Créez votre compte, publiez votre
                première annonce — et bienvenue dans la communauté Agri Market
                Africa.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/annonces/nouvelle"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-sand-100"
                >
                  Publier une annonce
                  <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                </Link>
                <Link
                  href="/annonces"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Explorer les annonces
                </Link>
                <Link
                  href="/faq"
                  className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Consulter la FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
