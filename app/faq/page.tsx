import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FaqView } from "@/components/faq/faq-view";
import { FAQ_EMAIL } from "@/lib/content/faq";
import { Mail } from "lucide-react";

export const metadata = {
  title: "FAQ — Aide & questions fréquentes",
  description:
    "Tout ce qu'il faut savoir pour utiliser Agri Market Africa — du compte à la première transaction.",
};

export default function FaqPage() {
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
              Aide &amp; FAQ
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Vos questions,{" "}
              <em className="font-normal italic bg-gradient-to-br from-brand-600 to-harvest-600 bg-clip-text text-transparent">
                nos réponses.
              </em>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Tout ce qu'il faut savoir pour utiliser Agri Market Africa — du
              compte à la première transaction. Si vous ne trouvez pas,
              contactez-nous.
            </p>
          </div>
        </section>

        {/* Contenu */}
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <FaqView />

          {/* CTA contact */}
          <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-brand-600 to-brand-700 p-8 text-center text-white shadow-lg sm:p-10">
            <h2 className="font-display text-2xl font-semibold tracking-tight">
              Vous n'avez pas trouvé votre réponse ?
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-white/80">
              Notre équipe répond généralement sous 48h. Décrivez votre
              situation, on s'occupe du reste.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`mailto:${FAQ_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-brand-700 shadow-sm transition hover:bg-sand-100"
              >
                <Mail className="h-4 w-4" strokeWidth={2.2} />
                {FAQ_EMAIL}
              </a>
              <Link
                href="/guide"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Consulter le guide
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
