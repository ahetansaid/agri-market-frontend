"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Mail, Headphones } from "lucide-react";

// Nom de l'onglet à définir (placeholder : "Assistance").
const LABEL = "Assistance";
const CONTACT_EMAIL = "contact@idamarketplace.com";

export function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      "Contact — Agri Market Africa"
    )}&body=${body}`;
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] max-w-[calc(100vw-3rem)] overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            {/* En-tête */}
            <div className="relative bg-gradient-to-br from-brand-500 to-harvest-600 p-5 text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/15">
                  <Headphones className="h-6 w-6" strokeWidth={2} />
                </span>
                <div>
                  <div className="font-display text-lg font-semibold">{LABEL}</div>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    En ligne · réponse sous 24h
                  </div>
                </div>
              </div>
            </div>

            {/* Corps */}
            <div className="p-5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Bonjour 👋 Une question sur une annonce, votre compte, ou la
                plateforme ? Écrivez-nous, notre équipe vous répond.
              </p>

              <form onSubmit={send} className="mt-4">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  placeholder="Votre message…"
                  className="w-full resize-none rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder-muted-foreground outline-none transition focus:border-brand-400 focus:bg-card"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:shadow-brand-600/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" strokeWidth={2.5} />
                  Envoyer
                </button>
              </form>

              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground transition hover:text-brand-700"
              >
                <Mail className="h-3.5 w-3.5" />
                {CONTACT_EMAIL}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant */}
      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={LABEL}
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 left-6 z-50 flex h-14 items-center gap-2.5 rounded-full bg-gradient-to-br from-brand-500 to-harvest-600 pl-4 pr-5 text-white shadow-xl shadow-brand-600/30 ring-1 ring-white/20 transition-shadow hover:shadow-brand-600/50"
      >
        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15">
          {open ? (
            <X className="h-5 w-5" strokeWidth={2.5} />
          ) : (
            <MessageCircle className="h-5 w-5" strokeWidth={2.5} />
          )}
        </span>
        <span className="hidden text-sm font-semibold sm:inline">{LABEL}</span>
      </motion.button>
    </>
  );
}
