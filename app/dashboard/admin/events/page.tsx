"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ProductImage } from "@/components/ui/product-image";
import {
  fetchAdminEvents,
  saveAdminEvent,
  deleteAdminEvent,
  type AdminEvent,
} from "@/lib/admin";
import {
  ArrowLeft,
  Loader2,
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  CalendarDays,
  ImageIcon,
} from "lucide-react";

type Editing = "new" | AdminEvent | null;

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15";

/** ISO -> valeur d'input datetime-local (YYYY-MM-DDTHH:MM). */
function toLocalInput(iso: string): string {
  return iso ? iso.slice(0, 16) : "";
}

function fmtDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<AdminEvent[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setEvents(await fetchAdminEvents());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Chargement impossible.");
      setEvents([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (editing !== null) {
    return (
      <EventForm
        event={editing === "new" ? null : editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Administration
      </Link>

      <div className="mb-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
            <CalendarDays className="h-5 w-5" strokeWidth={2} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Événements
            </h1>
            <p className="text-sm text-muted-foreground">
              Salons, forums et rencontres.
            </p>
          </div>
        </div>
        <button
          onClick={() => setEditing("new")}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" />
          Nouvel événement
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {events === null ? (
        <div className="grid place-items-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
            <CalendarDays className="h-7 w-7" />
          </div>
          <h2 className="font-display text-lg font-semibold">Aucun événement</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Créez votre premier salon ou rencontre.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => (
            <div
              key={ev.id}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden rounded-xl bg-sand-200 sm:h-20 sm:w-32">
                <ProductImage
                  src={ev.image_fr}
                  alt={ev.titre}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      ev.prochain_evenement
                        ? "bg-harvest-100 text-harvest-700"
                        : "bg-sand-200 text-sand-700"
                    }`}
                  >
                    {ev.prochain_evenement ? "À venir" : "Passé"}
                  </span>
                </div>
                <h3 className="mt-1 truncate font-display font-semibold tracking-tight">
                  {ev.titre}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {fmtDate(ev.date_debut)} → {fmtDate(ev.date_fin)}
                </p>
              </div>
              <div className="flex shrink-0 gap-2">
                <button
                  onClick={() => setEditing(ev)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold transition hover:bg-secondary"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Modifier
                </button>
                <DeleteButton event={ev} onDeleted={load} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeleteButton({
  event,
  onDeleted,
}: {
  event: AdminEvent;
  onDeleted: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const [busy, setBusy] = useState(false);

  if (confirming) {
    return (
      <div className="inline-flex items-center gap-1">
        <button
          disabled={busy}
          onClick={async () => {
            setBusy(true);
            try {
              await deleteAdminEvent(event.slug);
              onDeleted();
            } finally {
              setBusy(false);
              setConfirming(false);
            }
          }}
          className="inline-flex items-center gap-1 rounded-full bg-destructive px-3 py-2 text-sm font-semibold text-white disabled:opacity-50"
        >
          {busy ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Trash2 className="h-3.5 w-3.5" />
          )}
          Confirmer
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="rounded-full px-2 py-2 text-muted-foreground hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/5"
    >
      <Trash2 className="h-3.5 w-3.5" />
      Supprimer
    </button>
  );
}

function EventForm({
  event,
  onCancel,
  onSaved,
}: {
  event: AdminEvent | null;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [titre, setTitre] = useState(event?.titre ?? "");
  const [description, setDescription] = useState(event?.description_fr ?? "");
  const [debut, setDebut] = useState(toLocalInput(event?.date_debut ?? ""));
  const [fin, setFin] = useState(toLocalInput(event?.date_fin ?? ""));
  const [image, setImage] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append("titre", titre);
      fd.append("description_fr", description);
      fd.append("date_debut", debut);
      fd.append("date_fin", fin);
      if (image) fd.append("image_fr", image);
      await saveAdminEvent(fd, event?.slug);
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <button
        onClick={onCancel}
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Événements
      </button>

      <h1 className="mb-6 font-display text-2xl font-semibold tracking-tight">
        {event ? "Modifier l'événement" : "Nouvel événement"}
      </h1>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <form
        onSubmit={submit}
        className="space-y-5 rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6"
      >
        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">Titre</span>
          <input
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
            required
            maxLength={200}
            className={inputCls}
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-sm font-semibold">
            Description (HTML autorisé)
          </span>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            className={inputCls}
          />
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Début</span>
            <input
              type="datetime-local"
              value={debut}
              onChange={(e) => setDebut(e.target.value)}
              required
              className={inputCls}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Fin</span>
            <input
              type="datetime-local"
              value={fin}
              onChange={(e) => setFin(e.target.value)}
              required
              className={inputCls}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold">
            <ImageIcon className="h-4 w-4" />
            Image {event ? "(laisser vide pour conserver l'actuelle)" : ""}
          </span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            className="block w-full text-sm text-muted-foreground file:mr-3 file:rounded-full file:border-0 file:bg-brand-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-brand-700 hover:file:bg-brand-100"
          />
        </label>

        <p className="text-[11px] text-muted-foreground">
          Le statut (à venir / passé) est calculé automatiquement à partir des
          dates.
        </p>

        <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-sm font-semibold text-muted-foreground hover:bg-secondary"
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {event ? "Enregistrer" : "Créer"}
          </button>
        </div>
      </form>
    </div>
  );
}
