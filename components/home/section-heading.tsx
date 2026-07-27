import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * En-tête de section homogène pour toute l'accueil (et au-delà).
 * Eyebrow discret + titre display avec accent italique + description
 * optionnelle + lien « voir tout ». Aéré et responsive.
 */
export function SectionHeading({
  eyebrow,
  title,
  accent,
  description,
  viewAllHref,
  viewAllLabel = "Voir tout",
  tone = "orange",
  align = "start",
}: {
  eyebrow?: string;
  title: string;
  accent?: string;
  description?: string;
  viewAllHref?: string;
  viewAllLabel?: string;
  tone?: "orange" | "green";
  align?: "start" | "center";
}) {
  const accentCls =
    tone === "green"
      ? "bg-gradient-to-br from-harvest-500 to-harvest-700 bg-clip-text text-transparent"
      : "bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent";
  const eyebrowCls = tone === "green" ? "text-harvest-700" : "text-brand-700";

  return (
    <div
      className={`mb-7 flex flex-col gap-4 sm:mb-9 sm:flex-row sm:items-end sm:justify-between ${
        align === "center" ? "text-center sm:text-left" : ""
      }`}
    >
      <div className={align === "center" ? "mx-auto sm:mx-0" : ""}>
        {eyebrow && (
          <span
            className={`inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.18em] ${eyebrowCls}`}
          >
            <span className="h-1 w-5 rounded-full bg-current opacity-60" />
            {eyebrow}
          </span>
        )}
        <h2 className="mt-2 font-display text-[clamp(1.6rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight">
          {title}
          {accent && (
            <>
              {" "}
              <em className={`font-normal italic ${accentCls}`}>{accent}</em>
            </>
          )}
        </h2>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>

      {viewAllHref && (
        <Link
          href={viewAllHref}
          className="group inline-flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          {viewAllLabel}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
