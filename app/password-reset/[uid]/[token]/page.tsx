"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { confirmPasswordReset, AuthError } from "@/lib/auth";
import {
  LockKeyhole,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function PasswordResetConfirmPage() {
  const params = useParams<{ uid: string; token: string }>();
  const router = useRouter();
  const uid = params?.uid ?? "";
  const token = params?.token ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    setLoading(true);
    try {
      await confirmPasswordReset(uid, token, password);
      setDone(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      setError(
        err instanceof AuthError ? err.message : "Réinitialisation impossible."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            {done ? (
              <div className="text-center">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-harvest-500 text-white">
                  <CheckCircle2 className="h-7 w-7" strokeWidth={2} />
                </div>
                <h1 className="font-display text-2xl font-semibold tracking-tight">
                  Mot de passe modifié
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Vous allez être redirigé vers la connexion…
                </p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  Se connecter
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <LockKeyhole className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h1 className="font-display text-2xl font-semibold tracking-tight">
                    Nouveau mot de passe
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Choisissez un nouveau mot de passe pour votre compte.
                  </p>
                </div>

                {error && (
                  <div className="mb-5 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">
                      Mot de passe
                    </label>
                    <div className="relative">
                      <input
                        type={showPwd ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Au moins 10 caractères"
                        className="w-full rounded-xl border border-border bg-background px-4 py-3 pr-11 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPwd((s) => !s)}
                        aria-label={showPwd ? "Masquer" : "Afficher"}
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
                  <div>
                    <label className="mb-1.5 block text-sm font-semibold">
                      Confirmer le mot de passe
                    </label>
                    <input
                      type={showPwd ? "text" : "password"}
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Répétez le mot de passe"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/30 transition hover:-translate-y-0.5 disabled:opacity-60"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      "Réinitialiser"
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
