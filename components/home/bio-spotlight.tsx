import Link from "next/link";
import { Leaf, ArrowRight, Sprout, ShieldCheck } from "lucide-react";
import { AnnouncementCard } from "@/components/home/announcement-card";
import type { Announcement } from "@/lib/api";

export function BioSpotlight({ items }: { items: Announcement[] }) {
  if (items.length < 2) return null;
  const grid = items.slice(0, 6);

  return (
    <section className="bg-gradient-to-br from-harvest-50 via-background to-harvest-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-6 lg:grid-cols-[0.85fr_2fr]">
          {/* Panneau éditorial vert */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-harvest-600 to-harvest-800 p-8 text-white lg:sticky lg:top-24 lg:self-start">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-harvest-400 opacity-30 blur-2xl" />
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest backdrop-blur">
              <Leaf className="h-3.5 w-3.5" strokeWidth={2.5} />
              Label bio
            </span>
            <h2 className="mt-5 font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Le meilleur de l&apos;agriculture{" "}
              <em className="font-normal italic text-harvest-200">biologique.</em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/80">
              Des produits cultivés sans intrants chimiques, vérifiés par notre
              équipe. Soutenez une agriculture durable et rémunératrice pour les
              producteurs.
            </p>

            <ul className="mt-6 space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <Sprout className="h-4 w-4 text-harvest-200" /> Sans intrants
                chimiques
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-harvest-200" /> Vérifié par
                double validation
              </li>
            </ul>

            <Link
              href="/annonces?bio=1"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-harvest-700 shadow-lg transition hover:-translate-y-0.5"
            >
              Découvrir tout le bio
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
          </div>

          {/* Grille de produits bio */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {grid.map((a) => (
              <AnnouncementCard key={a.id} annonce={a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
