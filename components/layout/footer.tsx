import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, ClockCheck, Globe, Languages } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-sand-900 text-sand-100">
      {/* Trust bar */}
      <div className="border-b border-white/5 bg-gradient-to-br from-sand-800 to-sand-900">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 py-8 md:grid-cols-4">
          {[
            { icon: ShieldCheck, title: "0% commission", sub: "Sans intermédiaire" },
            { icon: ClockCheck, title: "Validé en 24h", sub: "Double validation humaine" },
            { icon: Globe, title: "54 pays africains", sub: "Couverture panafricaine" },
            { icon: Languages, title: "FR · EN · IT", sub: "Multilingue" },
          ].map(({ icon: Icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300">
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

      {/* Main */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        {/* Brand */}
        <div className="mb-10 flex flex-col gap-6 border-b border-white/5 pb-10 md:flex-row md:items-start">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white p-1.5">
            <Image
              src="/logo.png"
              alt="Agri Market Africa"
              width={56}
              height={56}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-display font-semibold tracking-tight text-white sm:text-4xl">
              Agri{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                Market
              </em>{" "}
              Africa
            </h2>
            <p className="mt-3 text-sand-300 leading-relaxed">
              La marketplace agricole panafricaine. Producteurs, coopératives,
              acheteurs — réunis sans intermédiaire, sans commission.
            </p>
          </div>
        </div>

        {/* 4 cols */}
        <div className="grid gap-10 md:grid-cols-4">
          {[
            {
              title: "Marketplace",
              links: [
                { label: "Toutes les annonces", href: "/annonces" },
                { label: "Publier", href: "/annonces/nouvelle" },
                { label: "Filières", href: "/filieres" },
                { label: "Devenir vendeur", href: "/register?type=seller" },
              ],
            },
            {
              title: "Communauté",
              links: [
                { label: "Notre mission", href: "/apropos" },
                { label: "IDA International", href: "/presentation" },
                { label: "Événements & salons", href: "/evenements" },
                { label: "Guide utilisateur", href: "/guide" },
                { label: "FAQ", href: "/faq" },
              ],
            },
            {
              title: "Pour les pros",
              links: [
                { label: "Espace producteur", href: "/dashboard/producer" },
                { label: "Espace coopérative", href: "/dashboard/coop" },
                { label: "Espace acheteur", href: "/dashboard/buyer" },
                { label: "API & intégrations", href: "/api-docs" },
              ],
            },
            {
              title: "Ressources",
              links: [
                { label: "Contact", href: "/contact" },
                { label: "Support", href: "/support" },
                { label: "Statuts", href: "/status" },
                { label: "Blog", href: "/blog" },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 relative pb-3 font-display text-sm font-semibold text-white tracking-wide">
                {col.title}
                <span className="absolute bottom-0 left-0 h-0.5 w-7 rounded bg-gradient-to-r from-brand-500 to-brand-300" />
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-sand-300 hover:text-brand-300 transition hover:pl-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-sand-400 md:flex-row">
          <p>
            &copy; {new Date().getFullYear()}{" "}
            <strong className="text-sand-200">NourDign</strong> · Tous droits
            réservés.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/legal/terms" className="hover:text-brand-300">Conditions</Link>
            <Link href="/legal/privacy" className="hover:text-brand-300">Confidentialité</Link>
            <Link href="/legal/mentions" className="hover:text-brand-300">Mentions légales</Link>
          </div>
          <span className="italic font-display text-sand-300">
            Pensé en Afrique, pour l&apos;Afrique.
          </span>
        </div>
      </div>
    </footer>
  );
}
