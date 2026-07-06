"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Tag, ShoppingCart, Leaf, Package, ArrowRight, Star, BadgeCheck } from "lucide-react";
import type { Announcement } from "@/lib/api";

const typeIcons = {
  vente: Tag,
  achat: ShoppingCart,
  autre: Package,
};

const typeStyles = {
  vente: "bg-gradient-to-br from-brand-400 to-brand-600 text-white",
  achat: "bg-gradient-to-br from-sky-500 to-sky-700 text-white",
  autre: "bg-white/95 text-sand-900",
};

export function AnnouncementCard({ annonce }: { annonce: Announcement }) {
  const TypeIcon = typeIcons[annonce.type] || Package;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="h-full"
    >
      <Link
        href={`/annonces/${annonce.id}`}
        className="group relative block h-full overflow-hidden rounded-2xl border border-border/60 bg-card transition hover:border-brand-500/50 hover:shadow-xl hover:shadow-brand-500/10"
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-sand-200">
          {annonce.image_url ? (
            <Image
              src={annonce.image_url}
              alt={annonce.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-gradient-to-br from-sand-300 to-sand-400 text-sand-100">
              <Leaf className="h-16 w-16 opacity-40" />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider shadow-lg backdrop-blur-sm ${typeStyles[annonce.type]}`}
            >
              <TypeIcon className="h-2.5 w-2.5" strokeWidth={3} />
              {annonce.type_display}
            </span>
            {annonce.is_organic && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-br from-harvest-500 to-harvest-700 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                <Leaf className="h-2.5 w-2.5" strokeWidth={3} />
                Bio
              </span>
            )}
          </div>

          {/* Country flag */}
          {annonce.country_code && (
            <div className="absolute right-3 top-3 flex h-6 w-8 items-center justify-center overflow-hidden rounded-md shadow-lg ring-1 ring-white/30" title={annonce.country_name ?? undefined}>
              <span className={`fi fi-${annonce.country_code.toLowerCase()} h-full w-full`} />
            </div>
          )}

          {/* Quantity overlay */}
          {annonce.quantity && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="inline-flex items-baseline gap-1 rounded-lg bg-white/95 px-3 py-1.5 backdrop-blur-sm shadow-lg">
                <Package className="mr-0.5 h-3 w-3 text-brand-600" strokeWidth={2.5} />
                <strong className="font-display text-sm font-bold tracking-tight text-sand-900">
                  {annonce.quantity.toLocaleString("fr-FR")}
                </strong>
                <span className="text-[10px] italic text-sand-500">
                  {annonce.unit}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-3">
          {annonce.category_name && (
            <div className="mb-1 flex items-center justify-between gap-2">
              <span className="truncate text-[10px] font-semibold uppercase tracking-wide text-brand-600">
                {annonce.category_name}
              </span>
              <span className="inline-flex shrink-0 items-center gap-0.5 text-[10px] font-medium text-harvest-700">
                <BadgeCheck className="h-3 w-3" strokeWidth={2.5} />
                Vérifié
              </span>
            </div>
          )}
          <h3 className="font-display line-clamp-2 min-h-[2.5em] text-sm font-semibold leading-snug tracking-tight text-foreground">
            {annonce.title}
          </h3>

          <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/60 pt-2.5">
            {annonce.seller.ratings_count > 0 ? (
              <div className="flex items-center gap-1 text-xs">
                <Star className="h-3 w-3 fill-gold text-gold" strokeWidth={0} />
                <span className="font-display font-bold text-foreground">
                  {annonce.seller.rating_avg}
                </span>
                <span className="text-muted-foreground">
                  ({annonce.seller.ratings_count})
                </span>
              </div>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-harvest-100 px-2 py-0.5 text-[10px] font-bold text-harvest-700">
                Nouveau
              </span>
            )}

            <span className="inline-flex items-center gap-1 rounded-full bg-brand-100/70 px-2.5 py-1 text-[11px] font-semibold text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
              Voir
              <ArrowRight
                className="h-3 w-3 transition-transform group-hover:translate-x-0.5"
                strokeWidth={2.5}
              />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
