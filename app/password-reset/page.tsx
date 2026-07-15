"use client";

import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { KeyRound, ArrowLeft, LifeBuoy } from "lucide-react";

export default function PasswordResetPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
              <KeyRound className="h-7 w-7" strokeWidth={1.75} />
            </div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">
              Mot de passe oublié ?
            </h1>
            <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
              La réinitialisation en libre-service arrive bientôt. En attendant,
              contactez notre service client via le chat (en bas à droite) ou par
              email — nous réinitialisons votre accès rapidement.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:agrimarketafrica@nourdignagrimarket.com?subject=Réinitialisation%20de%20mot%20de%20passe"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-3 text-sm font-semibold text-white shadow-lg"
              >
                <LifeBuoy className="h-4 w-4" />
                Contacter le support
              </a>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour à la connexion
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
