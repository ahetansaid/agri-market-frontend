"use client";

import { useEffect, useState } from "react";
import { Star, ShieldCheck, MessageSquareQuote } from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { fetchMyRatings, type MyRatingsPayload } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

function Stars({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-4 w-4 ${
            s <= n ? "fill-amber-400 text-amber-400" : "fill-transparent text-sand-300"
          }`}
          strokeWidth={0}
        />
      ))}
    </span>
  );
}

export default function MyRatingsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<MyRatingsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMyRatings()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <DashboardShell role="producer">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Mes{" "}
          <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
            avis
          </em>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Ce que les acheteurs disent de vos transactions.
        </p>
      </div>

      {/* Résumé */}
      <div className="mb-8 flex items-center gap-6 rounded-3xl bg-gradient-to-br from-sand-900 to-sand-800 p-6 text-white shadow-xl">
        <div className="text-center">
          <div className="font-display text-5xl font-bold leading-none">
            {data?.summary.avg != null ? data.summary.avg : "—"}
          </div>
          <div className="mt-2">
            <Stars n={Math.round(data?.summary.avg ?? 0)} />
          </div>
        </div>
        <div className="h-14 w-px bg-white/15" />
        <div>
          <div className="font-display text-2xl font-semibold">
            {data?.summary.count ?? 0}
          </div>
          <div className="text-sm text-white/60">
            avis reçu{(data?.summary.count ?? 0) > 1 ? "s" : ""}
          </div>
        </div>
      </div>

      {/* Liste */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-sand-100" />
          ))}
        </div>
      ) : !data || data.results.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-700">
            <MessageSquareQuote className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-xl font-semibold">Aucun avis pour l&apos;instant</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Concluez votre première transaction pour recevoir vos premiers avis.
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {data.results.map((r) => (
            <li
              key={r.id}
              className="rounded-2xl border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-harvest-600 font-bold text-white">
                    {r.author_name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                  <div>
                    <div className="font-semibold">{r.author_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                </div>
                <Stars n={r.stars} />
              </div>
              {r.comment && (
                <p className="mt-3 text-sm italic text-foreground/80">
                  &laquo; {r.comment} &raquo;
                </p>
              )}
              {r.would_recommend && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-harvest-50 px-3 py-1 text-xs font-semibold text-harvest-700">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Recommande ce vendeur
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </DashboardShell>
  );
}
