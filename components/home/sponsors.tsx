import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { IDA } from "@/lib/content/ida";

/**
 * Bande « Nos sponsors » — logos réels repris du CMS de l'ancienne plateforme.
 * `cta` affiche le bouton « Devenir sponsor ».
 */
export function Sponsors({ cta = false }: { cta?: boolean }) {
  return (
    <section className="border-t border-border/60 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-sand-50 px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
          Sponsors
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Soutiens financiers et techniques
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          Sans qui rien ne serait possible — leurs ressources élargissent notre
          impact panafricain.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {IDA.sponsors.map((s) => (
            <div
              key={s.name}
              title={s.name}
              className="grid h-16 w-28 place-items-center rounded-xl border border-border bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:h-20 sm:w-32"
            >
              <Image
                src={s.logo}
                alt={s.name}
                width={120}
                height={60}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>

        {cta && (
          <a
            href={`mailto:${IDA.email}?subject=Devenir sponsor — Agri Market Africa`}
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-harvest-500 to-harvest-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:from-harvest-400 hover:to-harvest-500"
          >
            <HeartHandshake className="h-4 w-4" strokeWidth={2.2} />
            Devenir sponsor
          </a>
        )}
      </div>
    </section>
  );
}
