"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import {
  fetchPendingAnnouncements,
  moderateAnnouncement,
  type PendingAnnouncement,
} from "@/lib/admin";
import { AuthError } from "@/lib/auth";
import {
  ArrowLeft,
  Loader2,
  Check,
  X,
  ShieldCheck,
  ExternalLink,
  Info,
} from "lucide-react";

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  pending_first: {
    label: "1re validation",
    cls: "bg-amber-100 text-amber-700",
  },
  pending_second: {
    label: "2de validation",
    cls: "bg-orange-100 text-orange-700",
  },
};

export default function ModerationPage() {
  const [items, setItems] = useState<PendingAnnouncement[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);
  const [rejecting, setRejecting] = useState<number | null>(null);
  const [reason, setReason] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await fetchPendingAnnouncements();
      setItems(data.results);
    } catch (e) {
      setError(e instanceof AuthError ? e.message : "Chargement impossible.");
      setItems([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const act = async (
    id: number,
    action: "approve" | "reject",
    motif?: string
  ) => {
    setBusy(id);
    setError(null);
    try {
      await moderateAnnouncement(id, action, motif);
      // Retire l'annonce traitée de la liste (elle change de statut).
      setItems((list) => (list ? list.filter((a) => a.id !== id) : list));
      setRejecting(null);
      setReason("");
    } catch (e) {
      setError(e instanceof AuthError ? e.message : "Action impossible.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Administration
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
          <ShieldCheck className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Modération
          </h1>
          <p className="text-sm text-muted-foreground">
            Annonces en attente de validation.
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {items === null ? (
        <div className="grid place-items-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-harvest-50 text-harvest-600">
            <Check className="h-7 w-7" />
          </div>
          <h2 className="font-display text-lg font-semibold">
            Rien à modérer
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Aucune annonce n'est en attente de validation.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((a) => {
            const st = STATUS_LABEL[a.status] ?? {
              label: a.status_display,
              cls: "bg-secondary text-foreground",
            };
            const isBusy = busy === a.id;
            return (
              <div
                key={a.id}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm"
              >
                <div className="flex flex-col gap-4 p-4 sm:flex-row sm:p-5">
                  {/* Image */}
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-2xl bg-sand-200 sm:h-28 sm:w-40">
                    <ProductImage
                      src={a.image_url}
                      alt={a.title}
                      fill
                      sizes="160px"
                      className="object-cover"
                    />
                  </div>

                  {/* Infos */}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${st.cls}`}
                      >
                        {st.label}
                      </span>
                      <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {a.type_display}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-base font-semibold leading-snug tracking-tight">
                      {a.title}
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      par <span className="font-medium">{a.author}</span> ·{" "}
                      {a.reference}
                    </p>
                    {a.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-foreground/70">
                        {a.description}
                      </p>
                    )}
                    <Link
                      href={`/annonces/${a.id}`}
                      target="_blank"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" />
                      Voir l'annonce
                    </Link>
                  </div>
                </div>

                {/* Actions */}
                <div className="border-t border-border bg-sand-50/60 px-4 py-3 sm:px-5">
                  {!a.can_validate ? (
                    <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Info className="h-3.5 w-3.5" />
                      Vous ne pouvez pas valider cette annonce (la vôtre, ou vous
                      avez déjà validé la 1re étape).
                    </p>
                  ) : rejecting === a.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        rows={2}
                        placeholder="Motif du rejet (communiqué à l'auteur)…"
                        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-500"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => {
                            setRejecting(null);
                            setReason("");
                          }}
                          className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
                        >
                          Annuler
                        </button>
                        <button
                          disabled={!reason.trim() || isBusy}
                          onClick={() => act(a.id, "reject", reason)}
                          className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                        >
                          {isBusy ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <X className="h-4 w-4" />
                          )}
                          Confirmer le rejet
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-end gap-2">
                      <button
                        disabled={isBusy}
                        onClick={() => setRejecting(a.id)}
                        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/5 disabled:opacity-50"
                      >
                        <X className="h-4 w-4" />
                        Rejeter
                      </button>
                      <button
                        disabled={isBusy}
                        onClick={() => act(a.id, "approve")}
                        className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-br from-harvest-500 to-harvest-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        {isBusy ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                        Approuver
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
