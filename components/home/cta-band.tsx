import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ShieldCheck, Sprout } from "lucide-react";

interface Props {
  stats: { producteurs: number };
}

export function CtaBand({ stats }: Props) {
  return (
    <section className="relative overflow-hidden py-28">
      <Image
        src="/images/cta-africa-farms.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />
      {/* Overlay signature orange -> vert */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-900/92 via-sand-900/80 to-harvest-900/85" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-brand-500 opacity-30 blur-[110px]" />
      <div className="pointer-events-none absolute -right-16 top-0 h-80 w-80 rounded-full bg-harvest-500 opacity-25 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] backdrop-blur">
          <Sprout className="h-3.5 w-3.5 text-harvest-300" />
          Rejoignez le mouvement
        </span>
        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
          Cultivez.{" "}
          <em className="font-normal italic">
            <span className="bg-gradient-to-r from-brand-300 to-harvest-300 bg-clip-text text-transparent">
              Vendez. Prospérez.
            </span>
          </em>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/75">
          Rejoignez plus de {stats.producteurs.toLocaleString("fr-FR")} producteurs
          et acheteurs qui font grandir l&apos;agriculture africaine — sans
          intermédiaire, sans commission.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-brand-700 shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:bg-brand-50"
          >
            Créer mon compte gratuit
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/annonces"
            className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 hover:-translate-y-0.5"
          >
            Explorer le marché
          </Link>
        </div>

        <p className="mt-7 inline-flex items-center gap-2 text-xs text-white/60">
          <ShieldCheck className="h-4 w-4 text-harvest-300" />
          Annonces vérifiées par double validation humaine · 0 % commission
        </p>
      </div>
    </section>
  );
}
