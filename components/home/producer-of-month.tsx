"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Award,
  ArrowRight,
  Package,
  Calendar,
  User,
  Building2,
  Star,
  MapPin,
} from "lucide-react";
import type { ProducerOfMonth } from "@/lib/api";

export function ProducerOfMonthSection({ data }: { data: ProducerOfMonth }) {
  if (!data.producer) return null;
  const { producer, featured } = data;

  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background pattern + gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><pattern id='pp' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'><circle cx='30' cy='30' r='8' fill='none' stroke='%231a2030' stroke-width='1.2'/><path d='M30 0 L30 14 M30 46 L30 60 M0 30 L14 30 M46 30 L60 30' stroke='%231a2030' stroke-width='1.2' fill='none'/></pattern></defs><rect width='120' height='120' fill='url(%23pp)'/></svg>")`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(232,93,31,0.04)_0%,transparent_60%)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 text-center"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full bg-sand-900 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-400">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand-500" />
            </span>
            Producteur du mois
          </span>
          <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Derrière chaque annonce,
            <br />
            <em className="italic font-normal bg-gradient-to-br from-brand-500 via-brand-600 to-brand-800 bg-clip-text text-transparent">
              un visage, une terre, une histoire.
            </em>
          </h2>
        </motion.header>

        {/* Card magazine */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="group relative grid overflow-hidden rounded-3xl bg-card shadow-2xl shadow-black/10 ring-1 ring-border md:grid-cols-2"
        >
          {/* MEDIA */}
          <div className="relative aspect-[4/3] overflow-hidden bg-sand-200 md:aspect-auto">
            {featured?.image_url ? (
              <Image
                src={featured.image_url}
                alt={featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              />
            ) : producer.picture ? (
              <Image
                src={producer.picture}
                alt={producer.display_name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-600 to-brand-800 text-brand-100">
                <User className="h-32 w-32 opacity-40" strokeWidth={1} />
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent" />

            {/* Badge overlay */}
            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-brand-700 shadow-lg backdrop-blur">
              <Award className="h-3 w-3" strokeWidth={2.5} />
              Vedette du mois
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-16">
            {/* Décoration N°mois */}
            <div className="absolute right-8 top-8 font-display text-6xl italic font-light leading-none tracking-tight text-sand-200 sm:text-7xl">
              N°
              <span className="text-4xl">
                {new Date().getMonth() + 1}
              </span>
            </div>

            {/* Identité */}
            <div className="flex items-center gap-4">
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white ring-offset-2 ring-offset-brand-100 shadow-lg">
                {producer.picture ? (
                  <Image
                    src={producer.picture}
                    alt={producer.display_name}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                ) : (
                  <div className="grid h-full w-full place-items-center bg-gradient-to-br from-brand-500 to-brand-700 font-display text-xl font-bold text-white">
                    {producer.display_name?.[0]?.toUpperCase() ??
                      producer.username[0]?.toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold leading-tight tracking-tight text-foreground">
                  {producer.display_name || producer.username}
                </h3>
                <p className="mt-0.5 flex items-center gap-1.5 text-sm text-muted-foreground">
                  {producer.country_code && (
                    <>
                      <span
                        className={`fi fi-${producer.country_code.toLowerCase()} h-3.5 w-5 shrink-0 rounded-sm`}
                      />
                      {producer.country_name}
                    </>
                  )}
                  {producer.city && (
                    <>
                      <MapPin className="ml-1 h-3 w-3" />
                      {producer.city}
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Quote */}
            <blockquote className="relative border-l-2 border-brand-500/40 pl-5 font-display italic text-lg leading-relaxed text-foreground/90">
              <span
                aria-hidden="true"
                className="absolute -left-1 -top-3 font-display text-5xl leading-none text-brand-500/30"
              >
                &ldquo;
              </span>
              Nos terres ont une histoire à raconter. Chaque récolte est un
              dialogue entre la patience du producteur et la générosité du sol
              africain.
            </blockquote>

            {/* Mini stats */}
            <div className="grid grid-cols-3 gap-4 border-y border-border py-4">
              <div className="text-center">
                <div className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {producer.transactions_count}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  Annonces
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl font-bold tracking-tight text-foreground">
                  {producer.years_active || 1}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {producer.years_active === 1 ? "An" : "Ans"}
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-2xl text-brand-600">
                  {producer.user_type === "entreprise" ? (
                    <Building2 className="mx-auto h-6 w-6" strokeWidth={2} />
                  ) : (
                    <User className="mx-auto h-6 w-6" strokeWidth={2} />
                  )}
                </div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                  {producer.user_type === "entreprise"
                    ? "Entreprise"
                    : "Particulier"}
                </div>
              </div>
            </div>

            {/* Rating */}
            {producer.ratings_count > 0 && (
              <div className="flex items-center gap-3 rounded-xl bg-gradient-to-br from-brand-50 to-brand-100/50 p-4 ring-1 ring-brand-200/50">
                <div className="flex items-baseline gap-0.5">
                  <span className="font-display text-3xl font-bold bg-gradient-to-br from-amber-500 to-amber-600 bg-clip-text text-transparent">
                    {producer.rating_avg}
                  </span>
                  <span className="font-display text-lg italic text-muted-foreground">
                    /5
                  </span>
                </div>
                <div>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`h-4 w-4 ${
                          s <= Math.round(producer.rating_avg || 0)
                            ? "fill-amber-500 text-amber-500"
                            : "fill-none text-sand-300"
                        }`}
                        strokeWidth={0}
                      />
                    ))}
                  </div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    Sur {producer.ratings_count} avis vérifiés
                  </div>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/annonces?user=${producer.id}`}
                className="group/cta inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 via-brand-600 to-brand-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-brand-600/50"
              >
                Voir ses annonces
                <ArrowRight className="h-4 w-4 transition-transform group-hover/cta:translate-x-1" />
              </Link>
              {featured && (
                <Link
                  href={`/annonces/${featured.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-brand-500/50 hover:bg-brand-50 hover:-translate-y-0.5"
                >
                  <Package className="h-4 w-4" strokeWidth={2} />
                  Produit phare
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
