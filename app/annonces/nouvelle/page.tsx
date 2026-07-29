"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/lib/auth-context";
import { createAnnouncement } from "@/lib/auth";
import { getCategories, type Category } from "@/lib/api";
import { useT } from "@/lib/i18n/client";
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
  { value: "vente", k: "filters.sale" },
  { value: "achat", k: "filters.purchase" },
  { value: "partenariat", k: "type.partnership" },
  { value: "autre", k: "filters.other" },
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
  const { t, locale } = useT();
  const [categories, setCategories] = useState<Category[]>([]);
  const [type, setType] = useState("vente");
  const [categoryId, setCategoryId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<{ reference: string; title: string } | null>(null);

  useEffect(() => {
    getCategories(locale).then(setCategories).catch(() => {});
  }, [locale]);

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
              {t("publish.title1")}{" "}
              <em className="text-gradient-brand font-normal italic">{t("publish.title2")}</em>
            </h1>
          </header>

          {/* Non connecté */}
          {!isLoading && !user && (
            <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <LogIn className="h-8 w-8" strokeWidth={1.75} />
              </div>
              <h2 className="font-display text-2xl font-semibold">
                {t("publish.loginTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
                {t("publish.loginText")}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/login?next=/annonces/nouvelle"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5"
                >
                  <LogIn className="h-4 w-4" />
                  {t("action.login")}
                </Link>
                <Link
                  href="/register?next=/annonces/nouvelle"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-harvest-400 hover:bg-harvest-50"
                >
                  {t("action.register")}
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
                {t("publish.submittedTitle")}
              </h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-harvest-700">
                « {done.title} » ({t("word.ref")} {done.reference}) {t("publish.submittedText")}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  href="/annonces"
                  className="inline-flex items-center gap-2 rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  {t("action.viewListings")}
                </Link>
                <button
                  onClick={() => setDone(null)}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
                >
                  <Plus className="h-4 w-4" />
                  {t("publish.publishAnother")}
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
              <Field label={t("filters.type")} required>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {TYPES.map((opt) => (
                    <label
                      key={opt.value}
                      className={`cursor-pointer rounded-xl border px-3 py-2.5 text-center text-sm font-semibold transition ${
                        type === opt.value
                          ? "border-brand-500 bg-brand-50 text-brand-700"
                          : "border-border hover:border-brand-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={opt.value}
                        checked={type === opt.value}
                        onChange={(e) => setType(e.target.value)}
                        className="sr-only"
                      />
                      {t(opt.k)}
                    </label>
                  ))}
                </div>
              </Field>

              {/* Titre */}
              <Field label={t("form.title")} required>
                <input
                  name="title"
                  required
                  maxLength={100}
                  placeholder={t("publish.titlePlaceholder")}
                  className={inputCls}
                />
              </Field>

              {/* Catégorie + sous-catégorie */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t("form.sector")} required>
                  <select
                    name="category"
                    required
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className={inputCls}
                  >
                    <option value="">{t("form.choose")}</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("form.subsector")} required>
                  <select name="subcategory" required disabled={!subcats.length} className={inputCls}>
                    <option value="">
                      {subcats.length ? t("form.choose") : t("form.chooseSectorFirst")}
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
                  <Field label={t("form.productName")} required>
                    <input name="product_name" required placeholder="Ex : Riz" className={inputCls} />
                  </Field>
                  <Field label={t("form.variety")}>
                    <input name="variety" placeholder="Ex : Sahel 108" className={inputCls} />
                  </Field>
                  <Field label={t("form.quantity")} required>
                    <input name="quantity" type="number" min={1} required placeholder="5" className={inputCls} />
                  </Field>
                  <Field label={t("form.unit")} required>
                    <input name="unit" required placeholder={t("form.unitPlaceholder")} className={inputCls} />
                  </Field>
                </div>
              )}

              {/* Pays + bio */}
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={t("form.country")}>
                  <select name="country" defaultValue={user.country_code ?? ""} className={inputCls}>
                    <option value="">{t("form.select")}</option>
                    {PAYS.map(([code, name]) => (
                      <option key={code} value={code}>
                        {name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t("form.agriculture")}>
                  <label className="flex h-11 cursor-pointer items-center gap-2 rounded-xl border border-border px-4 text-sm">
                    <input type="checkbox" name="is_organic" value="true" className="h-4 w-4 accent-harvest-600" />
                    {t("form.organicLabel")}
                  </label>
                </Field>
              </div>

              {/* Description */}
              <Field label={t("form.description")} required hint={t("publish.descHint")}>
                <textarea
                  name="description"
                  required
                  rows={5}
                  placeholder={t("publish.descPlaceholder")}
                  className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-brand-400"
                />
              </Field>

              {/* Image */}
              <Field label={t("form.photo")} hint={t("publish.photoHint")}>
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground transition hover:border-brand-300 hover:bg-brand-50">
                  <ImagePlus className="h-5 w-5 text-brand-600" />
                  <span>{t("publish.chooseImage")}</span>
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
                    {t("publish.publishing")}
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                    {t("publish.submit")}
                  </>
                )}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                {t("publish.reviewNote")}
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
