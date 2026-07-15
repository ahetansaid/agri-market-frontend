"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  ShieldCheck,
  Loader2,
  Save,
  Check,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { fetchMe, patchMe, type Me } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

export function ProfilePanel({ role }: { role: "producer" | "buyer" }) {
  const { user, refresh } = useAuth();
  const [me, setMe] = useState<Me | null>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    telephone: "",
    ville: "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    fetchMe().then((m) => {
      if (!m) return;
      setMe(m);
      setForm({
        first_name: m.first_name ?? "",
        last_name: m.last_name ?? "",
        telephone: m.telephone ?? "",
        ville: m.ville ?? "",
      });
    });
  }, [user]);

  const set = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);
    try {
      const updated = await patchMe(form);
      setMe(updated);
      setSaved(true);
      await refresh();
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Impossible d'enregistrer les modifications.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardShell role={role}>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Mon{" "}
          <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
            profil
          </em>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Vos informations personnelles et vos coordonnées.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Carte identité */}
        <aside className="rounded-3xl border border-border bg-card p-6 text-center shadow-sm">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-3xl font-bold text-white">
            {(me?.display_name || me?.username || "?")[0]?.toUpperCase()}
          </div>
          <div className="mt-4 font-display text-xl font-semibold">
            {me?.display_name || me?.username || "…"}
          </div>
          <div className="text-sm text-muted-foreground">
            {me?.user_type === "entreprise" ? "Entreprise / Coopérative" : "Particulier"}
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-harvest-50 px-3 py-1 font-semibold text-harvest-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Vérifié
            </span>
            {me?.rating_avg != null && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-semibold text-amber-700">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" strokeWidth={0} />
                {me.rating_avg} ({me.ratings_count})
              </span>
            )}
          </div>

          <dl className="mt-6 space-y-3 text-left text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 shrink-0" />
              <span className="truncate">{me?.email}</span>
            </div>
            {me?.country_name && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>{me.country_name}</span>
              </div>
            )}
          </dl>
        </aside>

        {/* Formulaire */}
        <form
          onSubmit={submit}
          className="rounded-3xl border border-border bg-card p-6 shadow-sm"
        >
          <h2 className="font-display text-lg font-semibold">Informations</h2>
          <p className="mb-5 mt-0.5 text-sm text-muted-foreground">
            Mettez à jour vos coordonnées à tout moment.
          </p>

          {error && (
            <div className="mb-4 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <Field icon={User} label="Prénom" value={form.first_name} onChange={(v) => set("first_name", v)} />
            <Field icon={User} label="Nom" value={form.last_name} onChange={(v) => set("last_name", v)} />
            <Field icon={Phone} label="Téléphone" value={form.telephone} onChange={(v) => set("telephone", v)} />
            <Field icon={MapPin} label="Ville" value={form.ville} onChange={(v) => set("ville", v)} />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5 disabled:opacity-60"
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
      </div>
    </DashboardShell>
  );
}

function Field({
  icon: Icon,
  label,
  value,
  onChange,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold">{label}</span>
      <span className="relative block">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 pl-10 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
        />
      </span>
    </label>
  );
}
