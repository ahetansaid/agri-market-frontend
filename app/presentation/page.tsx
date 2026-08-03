import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Partners } from "@/components/home/partners";
import { Sponsors } from "@/components/home/sponsors";
import { getT } from "@/lib/i18n/server";
import { IDA } from "@/lib/content/ida";
import { Mail, Phone, Globe, Languages, ArrowRight, Info } from "lucide-react";

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
        {/* HERO dark avec logo IDA */}
        <section className="relative overflow-hidden bg-sand-900 text-white">
          <div className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-brand-600 opacity-25 blur-[120px]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-harvest-500 opacity-20 blur-[120px]" />
          <div className="relative mx-auto max-w-4xl px-5 py-16 text-center sm:py-24">
            <div className="mx-auto mb-7 grid h-24 w-24 place-items-center rounded-3xl bg-white p-3 shadow-xl">
              <Image
                src={IDA.logo}
                alt="IDA International"
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-300 backdrop-blur">
              Notre organisation
            </span>
            <h1 className="mt-5 font-display text-[clamp(1.9rem,5.5vw,3.4rem)] font-medium leading-[1.08] tracking-tight">
              {IDA.title}
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Découvrez l'équipe et la mission qui portent la marketplace
              agricole panafricaine.
            </p>
          </div>
        </section>

        {/* Barre de contact IDA (chevauche le hero) */}
        <div className="relative z-10 mx-auto -mt-8 max-w-5xl px-4">
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-border bg-white p-5 shadow-lg lg:grid-cols-4">
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
                    <a href={href} className="block truncate text-sm font-medium text-foreground hover:text-brand-700">
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

        {/* Notre raison d'être — image + texte */}
        <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-border bg-sand-200 shadow-lg">
              <Image
                src={IDA.image}
                alt="IDA International"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
                <Info className="h-3.5 w-3.5" />
                À propos de nous
              </span>
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Notre raison d'être.
              </h2>
              <p className="mt-1 text-sm font-medium text-brand-700">{IDA.expansion}</p>
              <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partenaires (logos réels) */}
        <Partners />

        {/* Sponsors (logos réels + CTA) */}
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
