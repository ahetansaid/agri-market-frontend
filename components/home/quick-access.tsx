"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Sprout,
  PlusCircle,
  Users,
  Map,
  CalendarDays,
  Store,
  UserCircle,
} from "lucide-react";

const ITEMS = [
  { icon: LayoutGrid, label: "Toutes les annonces", href: "/annonces" },
  { icon: Sprout, label: "Filières", href: "/filieres" },
  { icon: PlusCircle, label: "Publier une annonce", href: "/annonces/nouvelle" },
  { icon: Users, label: "Producteurs", href: "/producteurs" },
  { icon: Map, label: "Carte des pays", href: "/pays" },
  { icon: CalendarDays, label: "Événements", href: "/evenements" },
  { icon: Store, label: "Devenir vendeur", href: "/register?type=seller" },
  { icon: UserCircle, label: "Mon compte", href: "/login" },
];

export function QuickAccess() {
  const railRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };

  return (
    <section className="relative z-20 -mt-8">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative">
          {/* Flèche gauche */}
          <button
            onClick={() => scroll(-1)}
            aria-label="Précédent"
            className="absolute -left-3 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-border bg-card p-2 text-brand-700 shadow-md transition hover:bg-brand-50 sm:grid"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
          </button>

          <div
            ref={railRef}
            className="flex gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {ITEMS.map(({ icon: Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                className="group flex min-w-[140px] flex-1 shrink-0 flex-col items-center gap-3 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-5 text-center shadow-lg shadow-brand-900/10 ring-1 ring-white/10 transition hover:-translate-y-1 hover:from-brand-500 hover:to-brand-600"
              >
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-white transition group-hover:bg-white/25">
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </span>
                <span className="text-[13px] font-semibold leading-tight text-white">
                  {label}
                </span>
              </Link>
            ))}
          </div>

          {/* Flèche droite */}
          <button
            onClick={() => scroll(1)}
            aria-label="Suivant"
            className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 place-items-center rounded-full border border-border bg-card p-2 text-brand-700 shadow-md transition hover:bg-brand-50 sm:grid"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
