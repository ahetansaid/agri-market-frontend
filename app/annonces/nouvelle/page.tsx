"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/lib/auth-context";
import { createAnnouncement } from "@/lib/auth";
import { getCategories, type Category } from "@/lib/api";
import {
  Plus,
  LogIn,
  Loader2,
  CheckCircle2,
  ImagePlus,
  Info,
  ArrowRight,
} from "lucide-react";

const TYPES = [
  { value: "vente", label: "Vente" },
  { value: "achat", label: "Achat" },
  { value: "partenariat", label: "Partenariat" },
  { value: "autre", label: "Autre" },
];

const PAYS = [
  ["SN", "Sénégal"], ["CI", "Côte d'Ivoire"], ["ML", "Mali"], ["BF", "Burkina Faso"],
  ["TG", "Togo"], ["BJ", "Bénin"], ["NE", "Niger"], ["GN", "Guinée"],
  ["CM", "Cameroun"], ["GH", "Ghana"], ["NG", "Nigéria"], ["CD", "RD Congo"],
  ["CG", "Congo"], ["GA", "Gabon"], ["KE", "Kenya"], ["ET", "Éthiopie"],
  ["UG", "Ouganda"], ["TZ", "Tanzanie"], ["MA", "Maroc"], ["DZ", "Algérie"],
  ["TN", "Tunisie"], ["EG", "Égypte"], ["ZA", "Afrique du Sud"], ["MG", "Madagascar"],
];

export default function PublishPage() {
  const { user, isLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [type, setType] = useState("vente");
  const [categoryId, setCategoryId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ reference: string; title: string } | null>(null);

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {});
  }, []);

  const selectedCat = categories.find((c) => String(c.id) === categoryId);
  const subcats = selectedCat?.subcategories ?? [];
  const needsProduct = type === "vente" || type === "achat";

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const img = fd.get("image");
    if (img instanceof File && img.size === 0) fd.delete("image");
    if (!fd.get("is_organic")) fd.set("is_organic", "false");
    try {
      const res = await createAnnouncement(fd);
      setDone({ reference: res.reference, title: res.title });
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors de la publication.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <header className="mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-600">
              Marketplace
            </span>
            <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Publier une{" "}
              <em className="text-gradient-brand font-normal italic">annonce</em>
            </h1>
          </header>

          {/* Non connecté */}
          {!isLoading && !user && (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <LogIn className="h-8 w-8" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-semibold">
                Connectez-vous pour publier
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                La publication d&apos;annonces est réservée aux membres. C&apos;est
                gratuit et rapide.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/login?next=/annonces/nouvelle"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5"
                >
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </Link>
                <Link
                  href="/register?next=/annonces/nouvelle"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-harvest-400 hover:bg-harvest-50"
                >
                  S&apos;inscrire
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Succès */}
          {done && (
            <div className="rounded-3xl border border-harvest-200 bg-harvest-50 p-10 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-harvest-500 text-white">
                <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-harvest-800">
                Annonce soumise !
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-harvest-700">
                « {done.title} » (réf. {done.reference}) est en cours de validation
                par notre équipe. Vous serez notifié dès sa publication.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/annonces"
                  className="inline-flex items-center gap-2 rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Voir les annonces
                </Link>
                <button
                  onClick={() => setDone(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                  Publier une autre
                </button>
              </div>
            </div>
          )}

          {/* Formulaire */}
          {!isLoading && user && !done && (
            <form
              onSubmit={onSubmit}
              className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              {error && (
                <div className="flex items-start gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {/* Type */}
              <Field label="Type d'annonce" required>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TYPES.map((t) => (
                    <label
                      key={t.value}
                      className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition ${
                        type === t.value
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-border hover:border-brand-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={t.value}
                        checked={type === t.value}
                        onChange={(e) => setType(e.target.value)}
                        className="sr-only"
                      />
                      {t.label}
                    </label>
                  ))}
                </div>
              </Field>

              {/* Titre */}
              <Field label="Titre" required>
                <input
                  name="title"
                  required
                  maxLength={100}
                  placeholder="Ex : Riz parfumé de la vallée, 5 tonnes"
                  className={inputCls}
                />
              </Field>

              {/* Catégorie + sous-catégorie */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Filière" required>
                  <select
                    name="category"
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">Choisir…</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Sous-filière" required>
                  <select name="subcategory" required disabled={!subcats.length} className={inputCls}>
                    <option value="">
                      {subcats.length ? "Choisir…" : "Choisir une filière d'abord"}
                    </option>
                    {subcats.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Produit (vente/achat) */}
              {needsProduct && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Nom du produit" required>
                    <input name="product_name" required placeholder="Ex : Riz" className={inputCls} />
                  </Field>
                  <Field label="Variété (optionnel)">
                    <input name="variety" placeholder="Ex : Sahel 108" className={inputCls} />
                  </Field>
                  <Field label="Quantité" required>
                    <input name="quantity" type="number" min={1} required placeholder="5" className={inputCls} />
                  </Field>
                  <Field label="Unité" required>
                    <input name="unit" required placeholder="tonnes, kg, litres…" className={inputCls} />
                  </Field>
                </div>
              )}

              {/* Pays + bio */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Pays">
                  <select name="country" defaultValue={user.country_code ?? ""} className={inputCls}>
                    <option value="">Sélectionner…</option>
                    {PAYS.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Agriculture">
                  <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-border px-4 text-sm">
                    <input type="checkbox" name="is_organic" value="true" className="h-4 w-4 accent-harvest-600" />
                    Produit issu de l&apos;agriculture biologique
                  </label>
                </Field>
              </div>

              {/* Description */}
              <Field label="Description" required hint="N'indiquez aucune coordonnée (téléphone, email, réseaux) — elles sont interdites et détectées automatiquement.">
                <textarea
                  name="description"
                  required
                  rows={5}
                  placeholder="Décrivez votre produit, sa qualité, ses conditions…"
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-400"
                />
              </Field>

              {/* Image */}
              <Field label="Photo (optionnel)" hint="JPG ou PNG, 500 Ko max, idéalement 740×380 px.">
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground transition hover:border-brand-300 hover:bg-brand-50">
                  <ImagePlus className="h-5 w-5 text-brand-600" />
                  <span>Choisir une image</span>
                  <input type="file" name="image" accept="image/jpeg,image/png" className="sr-only" />
                </label>
              </Field>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:shadow-brand-600/40 disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Publication…
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    Publier l&apos;annonce
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Votre annonce sera vérifiée par notre équipe avant publication (sous 24h).
              </p>
            </form>
          )}

          {isLoading && (
            <div className="grid h-64 place-items-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

const inputCls =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm text-foreground outline-none transition focus:border-brand-400";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
