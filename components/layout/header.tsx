"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, User, ShoppingBag, Globe2 } from "lucide-react";
import { motion } from "motion/react";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/60">
      {/* Top utility bar */}
      <div className="hidden md:block border-b border-border/40 bg-sand-900 text-sand-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-2 text-xs">
          <div className="flex items-center gap-6 text-sand-300">
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-harvest-500 shadow-[0_0_8px_theme(colors.harvest-500)]" />
              0% commission
            </span>
            <span>54 pays africains</span>
            <span>Validé en 24h</span>
          </div>
          <div className="flex items-center gap-4 text-sand-300">
            <Link href="/help" className="hover:text-brand-300">
              Aide
            </Link>
            <span>contact@idamarketplace.com</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-6 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-11 w-11 shrink-0 rounded-xl bg-white p-1 shadow-sm ring-1 ring-brand-200">
            <Image
              src="/logo.png"
              alt="Agri Market Africa"
              width={40}
              height={40}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <div className="text-lg leading-tight font-bold tracking-tight">
              Agri{" "}
              <em className="font-display italic font-medium bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 bg-clip-text text-transparent">
                Market
              </em>{" "}
              Africa
            </div>
            <div className="text-xs text-muted-foreground italic font-display">
              L&apos;agriculture africaine en ligne
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="ml-6 hidden lg:flex items-center gap-1">
          {[
            { label: "Accueil", href: "/" },
            { label: "Marketplace", href: "/annonces" },
            { label: "Filières", href: "/filieres" },
            { label: "Pays", href: "/pays" },
            { label: "À propos", href: "/apropos" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-sm font-medium text-foreground/80 hover:text-brand-600 transition"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2">
          <button
            aria-label="Rechercher"
            className="grid place-items-center rounded-full p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <Search className="h-4.5 w-4.5" strokeWidth={2} />
          </button>

          <button
            aria-label="Langue"
            className="hidden md:grid place-items-center rounded-full p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
          >
            <Globe2 className="h-4.5 w-4.5" strokeWidth={2} />
          </button>

          <Link
            href="/login"
            className="grid place-items-center rounded-full p-2.5 text-muted-foreground hover:bg-secondary hover:text-foreground transition"
            aria-label="Mon compte"
          >
            <User className="h-4.5 w-4.5" strokeWidth={2} />
          </Link>

          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/annonces/nouvelle"
              className="ml-1 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-600/25 hover:shadow-brand-600/40 transition"
            >
              <ShoppingBag className="h-4 w-4" strokeWidth={2.5} />
              Publier
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
