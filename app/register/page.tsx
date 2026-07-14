"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  Loader2,
  ArrowRight,
  User,
  Building2,
  MailCheck,
} from "lucide-react";
import { register, AuthError } from "@/lib/auth";

export default function RegisterPage() {
  const [sent, setSent] = useState<string | null>(null);
  const [userType, setUserType] = useState<"individu" | "entreprise">(
    "individu"
  );
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    telephone: "",
    ville: "",
    password: "",
    password_confirm: "",
  });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1);

  const setField = (k: keyof typeof form, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await register({ ...form, user_type: userType });
      setSent(res.email);
    } catch (err) {
      setError(
        err instanceof AuthError
          ? err.message
          : "Impossible de créer le compte."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-[400px_1fr]">
      {/* Visual */}
      <aside className="relative hidden overflow-hidden bg-sand-900 p-8 text-white md:flex md:flex-col md:justify-between">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><pattern id='a' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'><path d='M30 6 L54 30 L30 54 L6 30 Z' fill='none' stroke='%23ffffff' stroke-width='1.2'/><circle cx='30' cy='30' r='3' fill='%23ffffff'/></pattern></defs><rect width='120' height='120' fill='url(%23a)'/></svg>")`,
          }}
        />
        <div className="pointer-events-none absolute -left-10 top-10 h-96 w-96 rounded-full bg-brand-600 opacity-30 blur-[100px]" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white p-1 shadow-lg">
            <Image
              src="/logo.png"
              alt="Agri Market Africa"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="font-display text-lg font-bold tracking-tight">
            Agri{" "}
            <em className="italic font-medium bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
              Market
            </em>{" "}
            Africa
          </div>
        </Link>

        <div className="relative z-10 max-w-md">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur text-brand-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
            Rejoignez-nous
          </span>
          <blockquote className="font-display text-2xl italic font-normal leading-snug tracking-tight">
            Inscrivez-vous gratuitement et publiez votre première annonce en
            moins de 3 minutes.
          </blockquote>
          <p className="mt-3 text-sm text-white/60">
            Aucune carte bancaire requise. Pas d&apos;engagement.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <TrustStat num="54" label="Pays" />
            <TrustStat num="100%" label="Vérifié" />
            <TrustStat num="0€" label="Frais" />
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          &copy; {new Date().getFullYear()} NourDign
        </p>
      </aside>

      {/* Form */}
      <section className="flex items-center justify-center p-6 sm:p-12 bg-sand-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-lg"
        >
          {sent ? (
            <div className="rounded-3xl border border-harvest-200 bg-harvest-50 p-8 text-center">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-harvest-500 text-white">
                <MailCheck className="h-8 w-8" strokeWidth={2} />
              </div>
              <h1 className="font-display text-2xl font-semibold text-harvest-800">
                Vérifiez votre email
              </h1>
              <p className="mx-auto mt-2 max-w-sm text-sm text-harvest-700">
                Un lien de vérification a été envoyé à{" "}
                <strong>{sent}</strong>. Cliquez dessus pour activer votre
                compte, puis connectez-vous.
              </p>
              <Link
                href="/login"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Aller à la connexion
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-4 text-xs text-muted-foreground">
                Vous n&apos;avez rien reçu ? Vérifiez vos spams.
              </p>
            </div>
          ) : (
          <>
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
              Rejoignez{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                la marketplace.
              </em>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Quelques informations pour commencer. Vous pourrez compléter
              votre profil ensuite.
            </p>
          </div>

          {/* Progress dots */}
          <div className="mb-6 flex items-center justify-center gap-2">
            {[1, 2].map((n) => (
              <span
                key={n}
                className={`h-2 rounded-full transition-all ${
                  step === n
                    ? "w-8 bg-brand-600"
                    : "w-2 bg-sand-300"
                }`}
              />
            ))}
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            {step === 1 && (
              <>
                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Type de compte
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <TypeButton
                      active={userType === "individu"}
                      onClick={() => setUserType("individu")}
                      icon={User}
                      title="Particulier"
                      desc="Producteur individuel"
                    />
                    <TypeButton
                      active={userType === "entreprise"}
                      onClick={() => setUserType("entreprise")}
                      icon={Building2}
                      title="Entreprise"
                      desc="Coopérative ou société"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Field
                    label="Prénom"
                    value={form.first_name}
                    onChange={(v) => setField("first_name", v)}
                    placeholder="Aminata"
                  />
                  <Field
                    label="Nom"
                    value={form.last_name}
                    onChange={(v) => setField("last_name", v)}
                    placeholder="Diallo"
                  />
                </div>
                <Field
                  label="Nom d'utilisateur"
                  value={form.username}
                  onChange={(v) => setField("username", v)}
                  placeholder="aminata_d"
                  required
                />
                <Field
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(v) => setField("email", v)}
                  placeholder="aminata@exemple.com"
                  required
                />

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  disabled={!form.username || !form.email}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 hover:shadow-brand-600/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Continuer
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <Field
                  label="Téléphone (optionnel)"
                  type="tel"
                  value={form.telephone}
                  onChange={(v) => setField("telephone", v)}
                  placeholder="+229 XX XX XX XX"
                />
                <Field
                  label="Ville (optionnel)"
                  value={form.ville}
                  onChange={(v) => setField("ville", v)}
                  placeholder="Cotonou"
                />

                <div>
                  <label className="mb-1.5 block text-sm font-semibold">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) => setField("password", e.target.value)}
                      placeholder="Au moins 10 caractères"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPwd((s) => !s)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                    >
                      {showPwd ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Field
                  label="Confirmer le mot de passe"
                  type={showPwd ? "text" : "password"}
                  value={form.password_confirm}
                  onChange={(v) => setField("password_confirm", v)}
                  placeholder="Répétez votre mot de passe"
                  required
                />

                <div className="flex flex-col gap-3 sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 hover:shadow-brand-600/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Créer mon compte
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="rounded-xl border border-border px-6 py-3.5 text-sm font-semibold hover:bg-sand-100"
                  >
                    Précédent
                  </button>
                </div>
              </>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-700 hover:underline"
            >
              Se connecter
            </Link>
          </p>
          </>
          )}
        </motion.div>
      </section>
    </main>
  );
}

/* Helpers */
function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-semibold">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
      />
    </div>
  );
}

function TypeButton({
  active,
  onClick,
  icon: Icon,
  title,
  desc,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-start gap-3 rounded-2xl border p-4 text-left transition ${
        active
          ? "border-brand-500 bg-brand-50 shadow-md ring-2 ring-brand-500/20"
          : "border-border bg-background hover:border-brand-300 hover:bg-brand-50/50"
      }`}
    >
      <div
        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${
          active
            ? "bg-brand-600 text-white"
            : "bg-sand-100 text-muted-foreground"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </div>
      <div>
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
    </button>
  );
}

function TrustStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl font-bold leading-none tracking-tight bg-gradient-to-br from-brand-200 to-brand-500 bg-clip-text text-transparent">
        {num}
      </div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}
