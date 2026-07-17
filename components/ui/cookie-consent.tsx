"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

const STORAGE_KEY = "amk-cookie-consent"; // "accepted" | "rejected"

/**
 * Bandeau de consentement aux cookies.
 * S'affiche tant qu'aucun choix n'a été enregistré. Le choix est conservé
 * dans localStorage : "accepted" | "rejected".
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      /* localStorage indisponible : on n'affiche rien */
    }
  }, []);

  const choose = (choice: "accepted" | "rejected") => {
    try {
      localStorage.setItem(STORAGE_KEY, choice);
      // Événement écoutable par d'éventuels scripts analytics/marketing.
      window.dispatchEvent(
        new CustomEvent("cookie-consent", { detail: choice })
      );
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-4 left-4 z-[70] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-border bg-card/95 p-5 shadow-2xl shadow-black/20 backdrop-blur supports-[backdrop-filter]:bg-card/85"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600">
          <Cookie className="h-5 w-5" strokeWidth={2} />
        </div>
        <div className="min-w-0">
          <h2 className="font-display text-sm font-semibold">
            Nous respectons votre vie privée
          </h2>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            Nous utilisons des cookies pour le bon fonctionnement du site
            (connexion, préférences) et pour améliorer votre expérience. Les
            cookies essentiels restent toujours actifs. Voir notre{" "}
            <Link
              href="/legal/privacy"
              className="font-semibold text-brand-700 hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => choose("accepted")}
          className="flex-1 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={() => choose("rejected")}
          className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground/80 transition hover:bg-secondary"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
