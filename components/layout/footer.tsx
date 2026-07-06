import Link from "next/link";
import Image from "next/image";
import type { SVGProps } from "react";
import {
  ShieldCheck,
  Clock,
  Globe,
  Languages,
  Mail,
  ArrowRight,
  MapPin,
} from "lucide-react";

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5H16l.5-3h-3V8.25c0-.86.24-1.45 1.47-1.45H16V4.1c-.28-.04-1.2-.12-2.28-.12-2.26 0-3.8 1.38-3.8 3.9V10.5H7.5v3H10V21z" />
    </svg>
  );
}
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 12s0-3.5-.45-5.17a2.6 2.6 0 0 0-1.83-1.84C19.05 4.5 12 4.5 12 4.5s-7.05 0-8.72.49A2.6 2.6 0 0 0 1.45 6.83C1 8.5 1 12 1 12s0 3.5.45 5.17a2.6 2.6 0 0 0 1.83 1.84c1.67.49 8.72.49 8.72.49s7.05 0 8.72-.49a2.6 2.6 0 0 0 1.83-1.84C23 15.5 23 12 23 12zM9.75 15V9l5.75 3z" />
    </svg>
  );
}

const TRUST = [
  { icon: ShieldCheck, title: "0% commission", sub: "Sans intermédiaire" },
  { icon: Clock, title: "Validé en 24h", sub: "Double validation" },
  { icon: Globe, title: "54 pays africains", sub: "Couverture panafricaine" },
  { icon: Languages, title: "FR · EN · IT", sub: "Multilingue" },
];

const COLUMNS = [
  {
    title: "Marketplace",
    links: [
      { label: "Toutes les annonces", href: "/annonces" },
      { label: "Filières", href: "/filieres" },
      { label: "Publier une annonce", href: "/annonces/nouvelle" },
      { label: "Devenir vendeur", href: "/register?type=seller" },
    ],
  },
  {
    title: "Communauté",
    links: [
      { label: "Notre mission", href: "/apropos" },
      { label: "Événements & salons", href: "/evenements" },
      { label: "Producteurs", href: "/producteurs" },
      { label: "FAQ", href: "/faq" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Support", href: "/support" },
      { label: "Blog", href: "/blog" },
      { label: "API & intégrations", href: "/api-docs" },
    ],
  },
];

const PARTNERS = [
  "/images/partenaires/ANOPACI_logo.jpg",
  "/images/partenaires/CGMF_logo.jpg",
  "/images/partenaires/Cosem_Logo.png",
  "/images/partenaires/DomTerrylogo.png",
  "/images/partenaires/Logo_MAD.png",
  "/images/partenaires/Logo_NourDign.png",
];

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-sand-900 text-sand-100">
      {/* Accents charte */}
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand-600 opacity-20 blur-[120px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-harvest-600 opacity-20 blur-[120px]" />

      {/* Trust bar */}
      <div className="relative border-b border-white/5">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {TRUST.map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500/20 to-harvest-500/20 text-harvest-300">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </div>
              <div>
                <div className="font-display text-base font-semibold text-white">
                  {title}
                </div>
                <div className="text-xs text-sand-400">{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corps */}
      <div className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marque + newsletter */}
          <div>
            <div className="flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-1.5">
                <Image
                  src="/logo.png"
                  alt="Agri Market Africa"
                  width={48}
                  height={48}
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <div className="font-display text-xl font-semibold text-white">
                  Agri Market Africa
                </div>
                <div className="text-xs text-sand-400">By NourDign</div>
              </div>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-sand-300">
              La marketplace agricole panafricaine — producteurs, coopératives et
              acheteurs réunis sans intermédiaire, sans commission.
            </p>

            {/* Newsletter */}
            <form className="mt-6 max-w-sm">
              <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-sand-400">
                Newsletter
              </label>
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-1.5">
                <div className="flex flex-1 items-center gap-2 px-2">
                  <Mail className="h-4 w-4 text-harvest-400" />
                  <input
                    type="email"
                    placeholder="Votre email"
                    className="w-full bg-transparent py-2 text-sm text-white placeholder-sand-400 outline-none"
                  />
                </div>
                <button
                  type="submit"
                  aria-label="S'abonner"
                  className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 text-white transition hover:from-brand-400 hover:to-brand-500"
                >
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </div>

          {/* Colonnes de liens */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="relative mb-4 pb-3 font-display text-sm font-semibold tracking-wide text-white">
                {col.title}
                <span className="absolute bottom-0 left-0 h-0.5 w-7 rounded bg-gradient-to-r from-brand-500 to-harvest-500" />
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sand-300 transition hover:pl-1 hover:text-harvest-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Réseaux + partenaires */}
        <div className="mt-12 flex flex-col gap-8 border-t border-white/5 pt-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-white">
              Rejoignez-nous
            </span>
            <div className="flex items-center gap-2">
              {[FacebookIcon, InstagramIcon, YoutubeIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/5 text-sand-200 transition hover:bg-gradient-to-br hover:from-brand-500 hover:to-harvest-500 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Partenaires */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-sand-500">
              Partenaires
            </span>
            {PARTNERS.map((src) => (
              <div
                key={src}
                className="grid h-10 w-16 place-items-center rounded-lg bg-white p-1.5 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0"
              >
                <Image
                  src={src}
                  alt="Partenaire"
                  width={56}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bas de page */}
      <div className="relative border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-sand-400 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <strong className="text-sand-200">NourDign</strong> · Tous droits
            réservés.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/legal/terms" className="hover:text-harvest-300">
              Conditions
            </Link>
            <Link href="/legal/privacy" className="hover:text-harvest-300">
              Confidentialité
            </Link>
            <Link href="/legal/mentions" className="hover:text-harvest-300">
              Mentions légales
            </Link>
          </div>
          <span className="inline-flex items-center gap-1.5 italic text-sand-300">
            <MapPin className="h-3.5 w-3.5 text-brand-400" />
            Pensé en Afrique, pour l&apos;Afrique.
          </span>
        </div>
      </div>
    </footer>
  );
}
