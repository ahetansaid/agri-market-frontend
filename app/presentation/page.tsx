import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Partners } from "@/components/home/partners";
import { Sponsors } from "@/components/home/sponsors";
import { getT } from "@/lib/i18n/server";
import { IDA } from "@/lib/content/ida";
import {
  Mail,
  Phone,
  Globe,
  Languages,
  Sprout,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Présentation d'IDA — L'organisation derrière Agri Market Africa",
  description:
    "IDA (Initiative pour le Développement de l'Afrique), l'ONG qui porte la marketplace agricole panafricaine : mission, partenaires et sponsors.",
};

export default async function PresentationPage() {
  const { locale } = await getT();
  const paragraphs = IDA.description[locale] ?? IDA.description.fr;

  const CONTACT = [
    { icon: Phone, label: "Téléphone", value: IDA.phone, href: `tel:${IDA.phone.replace(/\s/g, "")}` },
    { icon: Mail, label: "Email", value: IDA.email, href: `mailto:${IDA.email}` },
    { icon: Globe, label: "Couverture", value: "54 pays africains" },
    { icon: Languages, label: "Langues", value: "FR · EN · IT" },
  ];

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
              Notre organisation
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              L'organisation derrière{" "}
              <em className="font-normal italic bg-gradient-to-br from-brand-600 to-harvest-600 bg-clip-text text-transparent">
                Agri Market Africa.
              </em>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Agri Market Africa est une initiative d'<strong>IDA International</strong>.
              Découvrez la mission qui porte la marketplace agricole panafricaine.
            </p>
          </div>
        </section>

        {/* Barre de contact IDA */}
        <div className="border-b border-border/60 bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-4 py-6 lg:grid-cols-4">
            {CONTACT.map(({ icon: Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      className="truncate text-sm font-medium text-foreground hover:text-brand-700"
                    >
                      {value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-foreground">{value}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Présentation d'IDA (contenu officiel) */}
        <section className="mx-auto max-w-3xl px-4 py-14 sm:py-20">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
            Qui est IDA ?
          </span>
          <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            {IDA.title}
          </h2>
          <p className="mt-1 text-sm font-medium text-brand-700">{IDA.expansion}</p>
          <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80">
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { icon: Sprout, t: "Made in Africa", d: "Pensé en Afrique, pour l'Afrique." },
              { icon: Globe, t: "54 pays", d: "Une couverture panafricaine." },
              { icon: HeartHandshake, t: "0 % commission", d: "Sans intermédiaire, sans frais cachés." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <div className="mt-3 font-display font-semibold">{t}</div>
                <p className="mt-1 text-xs text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Partenaires (composant réutilisé) */}
        <Partners />

        {/* Sponsors (composant réutilisé) */}
        <Sponsors cta />

        {/* CTA final */}
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
            Rejoignez l'aventure
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Ensemble, nous construisons l'avenir de l'agriculture africaine.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Producteurs, acheteurs, investisseurs, coopératives, partenaires
            institutionnels — chaque membre fait grandir la communauté.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700"
            >
              Créer mon compte
              <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
            </Link>
            <Link
              href="/annonces"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3 text-sm font-semibold text-foreground transition hover:border-brand-300 hover:text-brand-700"
            >
              Explorer la marketplace
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
