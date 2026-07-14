"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageCircle,
  X,
  Send,
  Headphones,
  LogIn,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import {
  getSupportMessages,
  sendSupportMessage,
  getSupportUnread,
  type SupportMsg,
} from "@/lib/auth";

// Nom de l'onglet à définir (placeholder : "Assistance").
const LABEL = "Assistance";

export function FloatingChat() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<SupportMsg[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [unread, setUnread] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Badge non-lus : poll léger quand le panneau est fermé
  useEffect(() => {
    if (!user) return;
    if (open) {
      setUnread(0);
      return;
    }
    let active = true;
    const check = () => getSupportUnread().then((n) => active && setUnread(n));
    check();
    const iv = setInterval(check, 15000);
    return () => {
      active = false;
      clearInterval(iv);
    };
  }, [user, open]);

  const load = useCallback(async () => {
    try {
      setMessages(await getSupportMessages());
    } catch {
      /* silencieux (polling) */
    }
  }, []);

  // Chargement + polling toutes les 4s tant que le panneau est ouvert & connecté
  useEffect(() => {
    if (!open || !user) return;
    setLoading(true);
    load().finally(() => setLoading(false));
    const iv = setInterval(load, 4000);
    return () => clearInterval(iv);
  }, [open, user, load]);

  // Auto-scroll vers le dernier message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = text.trim();
    if (!body || sending) return;
    setText("");
    setSending(true);
    try {
      setMessages(await sendSupportMessage(body));
    } catch {
      setText(body);
    } finally {
      setSending(false);
    }
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
            className="fixed bottom-24 left-6 z-50 flex h-[440px] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl"
          >
            {/* En-tête */}
            <div className="relative shrink-0 bg-gradient-to-br from-brand-500 to-harvest-600 p-4 text-white">
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 transition hover:bg-white/25"
              >
                <X className="h-4 w-4" strokeWidth={2.5} />
              </button>
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/15">
                  <Headphones className="h-5 w-5" strokeWidth={2} />
                </span>
                <div>
                  <div className="font-semibold">{LABEL}</div>
                  <div className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-lime" />
                    Service client · réponse sous 24h
                  </div>
                </div>
              </div>
            </div>

            {/* Corps */}
            {!user ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
                <div className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                  <LogIn className="h-7 w-7" strokeWidth={1.75} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Connectez-vous pour discuter avec notre service client et
                  garder l&apos;historique de vos échanges.
                </p>
                <Link
                  href="/login"
                  className="mt-1 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  <LogIn className="h-4 w-4" />
                  Se connecter
                </Link>
              </div>
            ) : (
              <>
                <div
                  ref={scrollRef}
                  className="flex-1 space-y-2.5 overflow-y-auto bg-sand-50 p-4"
                >
                  {loading && messages.length === 0 ? (
                    <div className="grid h-full place-items-center text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  ) : messages.length === 0 ? (
                    <div className="grid h-full place-items-center px-4 text-center text-sm text-muted-foreground">
                      Bonjour {user.first_name || user.username} 👋 Comment
                      pouvons-nous vous aider ?
                    </div>
                  ) : (
                    messages.map((m) => (
                      <div
                        key={m.id}
                        className={`flex ${m.from_staff ? "justify-start" : "justify-end"}`}
                      >
                        <div
                          className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${
                            m.from_staff
                              ? "rounded-tl-sm bg-white text-foreground ring-1 ring-border"
                              : "rounded-tr-sm bg-gradient-to-br from-brand-500 to-brand-600 text-white"
                          }`}
                        >
                          {m.body}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form
                  onSubmit={send}
                  className="flex shrink-0 items-center gap-2 border-t border-border bg-card p-2.5"
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Votre message…"
                    className="min-w-0 flex-1 rounded-full bg-secondary/60 px-4 py-2.5 text-sm text-foreground placeholder-muted-foreground outline-none focus:bg-secondary"
                  />
                  <button
                    type="submit"
                    disabled={!text.trim() || sending}
                    aria-label="Envoyer"
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white transition hover:from-brand-400 disabled:opacity-50"
                  >
                    {sending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" strokeWidth={2.5} />
                    )}
                  </button>
                </form>
              </>
            )}
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
        {!open && unread > 0 && (
          <span className="absolute -right-1 -top-1 grid h-6 min-w-[1.5rem] place-items-center rounded-full bg-coral px-1.5 text-xs font-bold text-white ring-2 ring-card">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </motion.button>
    </>
  );
}
