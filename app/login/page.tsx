"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Eye, EyeOff, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { login, AuthError } from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/dashboard/producer";
  const { refresh } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(username, password);
      await refresh();
      router.push(next);
    } catch (err) {
      setError(
        err instanceof AuthError ? err.message : "Erreur de connexion."
      );
    } finally {
      setLoading(false);
    }
    void remember;
  };

  return (
    <main className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      {/* Visual side */}
      <aside className="relative hidden overflow-hidden bg-sand-900 p-10 text-white md:flex md:flex-col md:justify-between">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          aria-hidden="true"
          style={{
            backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'><defs><pattern id='a' x='0' y='0' width='60' height='60' patternUnits='userSpaceOnUse'><path d='M30 6 L54 30 L30 54 L6 30 Z' fill='none' stroke='%23ffffff' stroke-width='1.2'/><circle cx='30' cy='30' r='3' fill='%23ffffff'/></pattern></defs><rect width='120' height='120' fill='url(%23a)'/></svg>")`,
          }}
        />
        <div className="pointer-events-none absolute -left-10 top-10 h-96 w-96 rounded-full bg-brand-600 opacity-30 blur-[100px]" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-80 w-80 rounded-full bg-brand-400 opacity-25 blur-[100px]" />

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white p-1 shadow-lg ring-1 ring-brand-500/30">
            <Image
              src="/logo.png"
              alt="Agri Market Africa"
              width={40}
              height={40}
              className="h-full w-full object-contain"
            />
          </div>
          <div>
            <div className="font-display text-xl font-bold tracking-tight">
              Agri{" "}
              <em className="italic font-medium bg-gradient-to-br from-brand-300 via-brand-400 to-brand-600 bg-clip-text text-transparent">
                Market
              </em>{" "}
              Africa
            </div>
            <div className="text-[10px] uppercase tracking-widest text-white/50">
              Back-office
            </div>
          </div>
        </Link>

        <div className="relative z-10 max-w-md">
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur text-brand-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500" />
            Témoignage
          </span>
          <blockquote className="relative font-display text-2xl italic font-normal leading-snug tracking-tight pl-6">
            <span
              aria-hidden="true"
              className="absolute -left-1 -top-8 text-6xl leading-none text-brand-500/30"
            >
              &ldquo;
            </span>
            Depuis que j&apos;ai rejoint la plateforme, je trouve mes acheteurs
            en moins d&apos;une semaine. Ma récolte ne dort plus dans le
            grenier.
          </blockquote>
          <p className="mt-4 text-sm text-white/60">
            — Aminata D., productrice de mil, Mali
          </p>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
            <TrustStat num="54" label="Pays" />
            <TrustStat num="100%" label="Vérifié" />
            <TrustStat num="0€" label="Frais" />
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          &copy; {new Date().getFullYear()} NourDign · Pensé en Afrique.
        </p>
      </aside>

      {/* Form side */}
      <section className="relative flex items-center justify-center bg-sand-50 p-6 sm:p-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-400 opacity-10 blur-[100px]" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          <div className="mb-8 text-center">
            <h1 className="font-display text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              Bon retour{" "}
              <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
                parmi nous.
              </em>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Connectez-vous pour publier, échanger et conclure vos
              transactions.
            </p>
          </div>

          {error && (
            <div className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-semibold"
              >
                Identifiant
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                autoFocus
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nom d'utilisateur ou email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold"
              >
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Votre mot de passe"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  aria-label={showPwd ? "Masquer" : "Afficher"}
                >
                  {showPwd ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 accent-brand-600 cursor-pointer"
                />
                <span className="text-muted-foreground">Se souvenir de moi</span>
              </label>
              <Link
                href="/password-reset"
                className="font-semibold text-brand-700 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition-all hover:-translate-y-0.5 hover:shadow-brand-600/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Connexion
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
              {!loading && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-all duration-700 group-hover:left-full"
                />
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="ml-1 font-semibold text-brand-700 hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </motion.div>
      </section>
    </main>
  );
}

function TrustStat({ num, label }: { num: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl font-bold leading-none tracking-tight bg-gradient-to-br from-brand-200 via-brand-300 to-brand-500 bg-clip-text text-transparent">
        {num}
      </div>
      <div className="mt-1.5 text-[10px] font-semibold uppercase tracking-widest text-white/50">
        {label}
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-sand-50" />}>
      <LoginForm />
    </Suspense>
  );
}
