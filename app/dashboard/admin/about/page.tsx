"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useT } from "@/lib/i18n/client";
import {
  fetchAdminAbout,
  saveAdminAbout,
  type AboutEdit,
  type AboutEditValue,
} from "@/lib/admin";
import { AuthError } from "@/lib/auth";
import {
  ArrowLeft,
  Loader2,
  Save,
  Check,
  Plus,
  Trash2,
  Languages,
} from "lucide-react";

const LANG_LABEL: Record<string, string> = {
  fr: "français",
  en: "anglais",
  it: "italien",
};

// Suggestions d'icônes (doivent exister dans lucide-react / la page publique).
const ICON_HINT = "Award, Leaf, Users, Lightbulb, ShieldCheck, Sparkles, Rocket, Globe";

export default function AdminAboutEditor() {
  const { locale } = useT();
  const [form, setForm] = useState<AboutEdit | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setForm(await fetchAdminAbout(locale));
    } catch (e) {
      setError(e instanceof AuthError ? e.message : "Chargement impossible.");
    } finally {
      setLoading(false);
    }
  }, [locale]);

  // Recharge quand la langue change (on édite la traduction active).
  useEffect(() => {
    load();
  }, [load]);

  const set = (k: keyof AboutEdit, v: string) =>
    setForm((f) => (f ? { ...f, [k]: v } : f));

  const setValue = (i: number, k: keyof AboutEditValue, v: string) =>
    setForm((f) =>
      f
        ? {
            ...f,
            values: f.values.map((val, idx) =>
              idx === i ? { ...val, [k]: v } : val
            ),
          }
        : f
    );

  const addValue = () =>
    setForm((f) =>
      f
        ? {
            ...f,
            values: [
              ...f.values,
              { icon: "Sparkles", title: "", description: "" },
            ],
          }
        : f
    );

  const removeValue = (i: number) =>
    setForm((f) =>
      f ? { ...f, values: f.values.filter((_, idx) => idx !== i) } : f
    );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const updated = await saveAdminAbout(form, locale);
      setForm(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Enregistrement impossible.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/dashboard/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Administration
      </Link>

          <div className="mb-6">
            <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
              Éditer la page{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-500 to-harvest-600 bg-clip-text text-transparent">
                À propos
              </em>
            </h1>
            <p className="mt-2 inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
              <Languages className="h-3.5 w-3.5" />
              Vous éditez la version en {LANG_LABEL[locale] ?? locale}. Changez la
              langue (globe, en-tête) pour éditer une autre traduction.
            </p>
          </div>

          {loading ? (
            <div className="grid place-items-center py-20 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : !form ? (
            <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-6 text-center text-sm text-destructive">
              {error ?? "Contenu indisponible."}
              <button
                onClick={load}
                className="mt-3 block w-full rounded-full bg-brand-600 px-4 py-2 font-semibold text-white"
              >
                Réessayer
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-6">
              {error && (
                <div className="rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              {/* En-tête */}
              <Card title="En-tête">
                <Field label="Titre de la page">
                  <input
                    value={form.title}
                    onChange={(e) => set("title", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Introduction">
                  <textarea
                    value={form.intro}
                    onChange={(e) => set("intro", e.target.value)}
                    rows={6}
                    className={inputCls}
                  />
                </Field>
              </Card>

              {/* Vision */}
              <Card title="Vision">
                <Field label="Titre de section">
                  <input
                    value={form.vision_title}
                    onChange={(e) => set("vision_title", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Texte">
                  <textarea
                    value={form.vision}
                    onChange={(e) => set("vision", e.target.value)}
                    rows={5}
                    className={inputCls}
                  />
                </Field>
              </Card>

              {/* Perspectives */}
              <Card title="Perspectives">
                <Field label="Titre de section">
                  <input
                    value={form.perspectives_title}
                    onChange={(e) => set("perspectives_title", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Texte">
                  <textarea
                    value={form.perspectives}
                    onChange={(e) => set("perspectives", e.target.value)}
                    rows={5}
                    className={inputCls}
                  />
                </Field>
              </Card>

              {/* Valeurs */}
              <Card title="Valeurs">
                <Field label="Titre de section">
                  <input
                    value={form.values_title}
                    onChange={(e) => set("values_title", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <div className="space-y-4">
                  {form.values.map((v, i) => (
                    <div
                      key={v.id ?? `new-${i}`}
                      className="rounded-2xl border border-border bg-sand-50 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Valeur {i + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeValue(i)}
                          className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold text-destructive transition hover:bg-destructive/10"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Retirer
                        </button>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-[160px_1fr]">
                        <Field label="Icône">
                          <input
                            value={v.icon}
                            onChange={(e) => setValue(i, "icon", e.target.value)}
                            className={inputCls}
                            placeholder="Award"
                          />
                        </Field>
                        <Field label="Titre">
                          <input
                            value={v.title}
                            onChange={(e) => setValue(i, "title", e.target.value)}
                            className={inputCls}
                          />
                        </Field>
                      </div>
                      <Field label="Description">
                        <textarea
                          value={v.description}
                          onChange={(e) =>
                            setValue(i, "description", e.target.value)
                          }
                          rows={2}
                          className={inputCls}
                        />
                      </Field>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addValue}
                    className="inline-flex items-center gap-2 rounded-full border border-dashed border-brand-300 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-50"
                  >
                    <Plus className="h-4 w-4" />
                    Ajouter une valeur
                  </button>
                  <p className="text-[11px] text-muted-foreground">
                    Icônes disponibles : {ICON_HINT}.
                  </p>
                </div>
              </Card>

              {/* Mission */}
              <Card title="Mission">
                <Field label="Titre de section">
                  <input
                    value={form.mission_title}
                    onChange={(e) => set("mission_title", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                <Field label="Texte">
                  <textarea
                    value={form.mission}
                    onChange={(e) => set("mission", e.target.value)}
                    rows={5}
                    className={inputCls}
                  />
                </Field>
              </Card>

              {/* Barre d'action */}
              <div className="sticky bottom-4 z-10 flex items-center justify-end gap-3 rounded-2xl border border-border bg-card/95 p-3 shadow-lg backdrop-blur">
                <Link
                  href="/apropos"
                  target="_blank"
                  className="text-sm font-semibold text-muted-foreground hover:text-foreground"
                >
                  Voir la page
                </Link>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : saved ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saved ? "Enregistré" : "Enregistrer"}
                </button>
              </div>
            </form>
          )}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <h2 className="mb-4 font-display text-lg font-semibold tracking-tight">
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      {children}
    </label>
  );
}
