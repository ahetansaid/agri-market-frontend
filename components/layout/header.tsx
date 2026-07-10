"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import type { SVGProps } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, X, ArrowRight, Phone, Mail } from "lucide-react";
import { AuthLinks } from "@/components/auth/auth-links";

const LINKS = [
  { href: "/", label: "Accueil", num: "01" },
  { href: "/annonces", label: "Marketplace", num: "02" },
  { href: "/filieres", label: "Filières", num: "03" },
  { href: "/pays", label: "Pays", num: "04" },
  { href: "/evenements", label: "Événements", num: "05" },
  { href: "/apropos", label: "À propos", num: "06" },
  { href: "/annonces/nouvelle", label: "Publier une annonce", num: "07" },
] as const;

/* Icônes de marque (retirées de lucide) */
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

const EASE = [0.22, 1, 0.36, 1] as const;

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Compactage top-bar au scroll (seuil 24px)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock du scroll body quand le drawer est ouvert
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Fermeture sur Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="sticky top-0 z-40 w-full"
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-500 ${
            scrolled
              ? "mt-3 max-w-6xl rounded-2xl border border-border bg-background/85 px-4 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.10)] backdrop-blur-xl sm:px-5"
              : "border-b border-border/60 bg-background/70 px-5 py-3.5 backdrop-blur-lg sm:px-6"
          }`}
        >
          {/* Marque */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative h-10 w-10 shrink-0 rounded-xl bg-white p-1 shadow-sm ring-1 ring-brand-100">
              <Image
                src="/logo.png"
                alt="Agri Market Africa"
                width={36}
                height={36}
                className="h-full w-full object-contain"
                priority
              />
            </div>
            <div className="hidden leading-tight sm:block">
              <div className="text-base font-bold tracking-tight text-harvest-700">
                Agri <span className="text-brand-600">Market</span> Africa
              </div>
              <div className="text-[10px] font-medium text-muted-foreground">
                By NourDign
              </div>
            </div>
          </Link>

          {/* Recherche persistante (desktop) */}
          <form
            action="/annonces"
            method="GET"
            className="mx-4 hidden max-w-lg flex-1 items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 transition focus-within:border-brand-400 focus-within:bg-card md:flex"
          >
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" strokeWidth={2} />
            <input
              type="search"
              name="q"
              placeholder="Rechercher un produit, une filière, un pays…"
              className="w-full bg-transparent text-sm text-foreground placeholder-muted-foreground outline-none"
            />
          </form>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            <button
              aria-label="Rechercher"
              className="grid place-items-center rounded-full p-2.5 text-sand-600 transition hover:bg-secondary hover:text-brand-600 md:hidden"
            >
              <Search className="h-5 w-5" strokeWidth={2} />
            </button>
            <AuthLinks variant="header" />
            <Link
              href="/annonces/nouvelle"
              className="hidden items-center gap-2 rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700 md:inline-flex"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Publier
            </Link>

            {/* Bouton MENU (hamburger 2 barres inégales) */}
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="group ml-1 flex h-11 items-center gap-2.5 rounded-full border border-border bg-secondary/60 pl-4 pr-2.5 transition-all hover:border-harvest-400 hover:bg-harvest-50"
            >
              <span className="hidden text-xs font-bold uppercase tracking-wider text-foreground/80 transition group-hover:text-harvest-700 sm:inline">
                Menu
              </span>
              <span className="flex h-7 w-7 flex-col items-center justify-center gap-[5px] rounded-full bg-foreground/5 transition group-hover:bg-harvest-500/20">
                <span className="block h-[2px] w-3.5 rounded bg-foreground transition-all group-hover:w-4 group-hover:bg-harvest-600" />
                <span className="block h-[2px] w-2.5 rounded bg-foreground/60 transition-all group-hover:w-4 group-hover:bg-harvest-600" />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* DRAWER latéral */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-sand-900/60 backdrop-blur-sm"
            />

            <motion.aside
              key="drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 260 }}
              className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col overflow-y-auto border-l border-border bg-card shadow-[-20px_0_60px_rgba(0,0,0,0.25)]"
            >
              {/* Glows charte */}
              <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-brand-500 opacity-10 blur-[110px]" />
              <div className="pointer-events-none absolute -right-16 bottom-1/4 h-72 w-72 rounded-full bg-harvest-500 opacity-10 blur-[110px]" />

              {/* Header drawer */}
              <div className="relative flex items-center justify-between border-b border-border px-6 py-5">
                <div className="flex items-center gap-2.5">
                  <div className="relative h-9 w-9 rounded-lg bg-white p-1 ring-1 ring-brand-100">
                    <Image src="/logo.png" alt="" width={32} height={32} className="h-full w-full object-contain" />
                  </div>
                  <div className="text-sm font-bold tracking-tight text-harvest-700">
                    Agri <span className="text-brand-600">Market</span> Africa
                  </div>
                </div>
                <motion.button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  whileHover={{ rotate: 90 }}
                  className="grid h-10 w-10 place-items-center rounded-full border border-border text-foreground/70 transition hover:border-brand-300 hover:text-brand-600"
                >
                  <X className="h-5 w-5" strokeWidth={2} />
                </motion.button>
              </div>

              {/* Liens */}
              <nav className="relative flex-1 px-4 py-6">
                <ul className="space-y-1">
                  {LINKS.map((link, i) => {
                    const active = isActive(link.href);
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: EASE }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={`group relative flex items-center gap-5 overflow-hidden rounded-2xl px-4 py-3.5 transition-all ${
                            active
                              ? "bg-harvest-500/12 shadow-[inset_0_0_0_1px_rgba(62,169,93,0.3)]"
                              : "hover:bg-secondary"
                          }`}
                        >
                          <span
                            className={`font-mono text-xs font-semibold ${
                              active ? "text-harvest-600" : "text-muted-foreground"
                            }`}
                          >
                            {link.num}
                          </span>
                          <span
                            className={`flex-1 font-display text-2xl font-semibold tracking-tight ${
                              active ? "text-harvest-700" : "text-foreground"
                            }`}
                          >
                            {link.label}
                          </span>
                          <motion.span
                            animate={active ? { x: [0, 4, 0] } : {}}
                            transition={active ? { duration: 1.5, repeat: Infinity } : {}}
                            className={active ? "text-harvest-600" : "text-muted-foreground/40"}
                          >
                            <ArrowRight className="h-5 w-5" strokeWidth={2} />
                          </motion.span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="mt-6 px-2"
                >
                  <Link
                    href="/register"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:shadow-brand-600/50"
                  >
                    Créer mon compte gratuit
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                </motion.div>
              </nav>

              {/* Footer drawer : contact + réseaux */}
              <div className="relative border-t border-border px-6 py-5">
                <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-brand-600" />
                    contact@idamarketplace.com
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-brand-600" />
                    0% commission · 54 pays · validé en 24h
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  {[FacebookIcon, InstagramIcon, YoutubeIcon].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-foreground/70 transition hover:bg-harvest-500 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
