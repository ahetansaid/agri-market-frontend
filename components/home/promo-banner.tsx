import Link from "next/link";
import { Megaphone, ArrowRight } from "lucide-react";

export function PromoBanner() {
  return (
    <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-harvest-600 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-4 gap-y-1 px-6 py-2.5 text-center text-sm">
        <span className="inline-flex items-center gap-2 font-semibold">
          <Megaphone className="h-4 w-4" strokeWidth={2.5} />
          Publiez gratuitement — 0% de commission sur toutes vos ventes
        </span>
        <Link
          href="/annonces/nouvelle"
          className="group inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur transition hover:bg-white/25"
        >
          Commencer
          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
