"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { requestPasswordReset, AuthError } from "@/lib/auth";
import { KeyRound, ArrowLeft, Loader2, MailCheck } from "lucide-react";

export default function PasswordResetPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await requestPasswordReset(email);
      setSent(true);
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "Demande impossible.");
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
            {sent ? (
              <div className="text-center">
                <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-harvest-500 text-white">
                  <MailCheck className="h-7 w-7" strokeWidth={2} />
                </div>
                <h1 className="font-display text-2xl font-semibold tracking-tight">
                  Vérifiez votre email
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
                  Si un compte existe pour <strong>{email}</strong>, un lien de
                  réinitialisation vient d&apos;être envoyé. Cliquez dessus pour
                  choisir un nouveau mot de passe.
                </p>
                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
                </Link>
                <p className="mt-4 text-xs text-muted-foreground">
                  Rien reçu ? Vérifiez vos spams.
                </p>
              </div>
            ) : (
              <>
                <div className="mb-6 text-center">
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <KeyRound className="h-7 w-7" strokeWidth={1.75} />
                  </div>
                  <h1 className="font-display text-2xl font-semibold tracking-tight">
                    Mot de passe oublié ?
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Entrez votre email : nous vous enverrons un lien pour
                    réinitialiser votre mot de passe.
                  </p>
                </div>

                {error && (
                  <div className="mb-5 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-semibold"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@exemple.com"
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
                      "Envoyer le lien"
                    )}
                  </button>
                </form>

                <Link
                  href="/login"
                  className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Retour à la connexion
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
