import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GUIDE_SECTIONS } from "@/lib/content/guide";
import { Check, Lightbulb, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Guide utilisateur — Comment ça marche",
  description:
    "Guide pas-à-pas : s'inscrire, publier une annonce, échanger avec un acheteur et conclure une transaction sereinement.",
};

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white to-sand-50">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-500 opacity-10 blur-[110px]" />
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-harvest-500 opacity-10 blur-[110px]" />
          <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
              Guide utilisateur
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Tirez le meilleur de{" "}
              <em className="font-normal italic bg-gradient-to-br from-brand-600 to-harvest-600 bg-clip-text text-transparent">
                la plateforme.
              </em>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Un guide simple, étape par étape, pour s'inscrire, publier une
              annonce, échanger avec un acheteur et conclure une transaction
              sereinement.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
            {/* Sommaire (sticky desktop) */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                Sommaire
              </p>
              <nav>
                <ul className="space-y-1">
                  {GUIDE_SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="group flex items-start gap-3 rounded-xl px-3 py-2 text-sm text-foreground/80 transition hover:bg-white hover:text-brand-700"
                      >
                        <span className="font-mono text-xs font-bold text-brand-500">
                          {s.n}
                        </span>
                        <span className="flex-1">{s.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Sections */}
            <div className="space-y-14">
              {GUIDE_SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="scroll-mt-24">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 font-display text-lg font-bold text-white shadow-sm">
                      {s.n}
                    </span>
                    <h2 className="font-display text-2xl font-semibold tracking-tight">
                      {s.title}
                    </h2>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.intro}
                  </p>

                  <ol className="mt-6 space-y-3">
                    {s.steps.map((step) => (
                      <li
                        key={step.t}
                        className="flex gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm"
                      >
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} />
                        </span>
                        <div>
                          <div className="font-semibold text-foreground">
                            {step.t}
                          </div>
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
                        <div className="font-semibold text-harvest-800">
                          {s.tip.t}
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-harvest-900/80">
                          {s.tip.d}
                        </p>
                      </div>
                    </div>
                  )}
                </section>
              ))}

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
      </main>
      <Footer />
    </>
  );
}
