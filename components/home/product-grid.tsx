import Link from "next/link";
import { ArrowRight, Layers } from "lucide-react";
import { AnnouncementCard } from "@/components/home/announcement-card";
import type { Announcement } from "@/lib/api";

export function ProductGrid({
  title,
  items,
  viewAllHref,
  tinted = false,
}: {
  title: string;
  items: Announcement[];
  viewAllHref: string;
  tinted?: boolean;
}) {
  if (!items.length) return null;

  return (
    <section className={tinted ? "bg-sand-50 py-12" : "bg-background py-12"}>
      <div className="mx-auto max-w-7xl px-6">
        <header className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-harvest-500 to-harvest-600 text-white">
              <Layers className="h-5 w-5" strokeWidth={2} />
            </span>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-harvest-700">
                Filière
              </div>
              <h2 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                {title}
              </h2>
            </div>
          </div>
          <Link
            href={viewAllHref}
            className="group inline-flex items-center gap-1.5 rounded-full bg-sand-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Voir tout
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </header>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {items.slice(0, 10).map((a) => (
            <AnnouncementCard key={a.id} annonce={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
