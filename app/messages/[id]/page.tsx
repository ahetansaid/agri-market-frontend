"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { useAuth } from "@/lib/auth-context";
import {
  getConversation,
  sendConversationMessage,
  type ConvPayload,
} from "@/lib/auth";
import { Send, ArrowLeft, Loader2, LogIn, Tag } from "lucide-react";

export default function ConversationPage() {
  const params = useParams<{ id: string }>();
  const cid = Number(params?.id);
  const { user, isLoading } = useAuth();
  const [convo, setConvo] = useState<ConvPayload | null>(null);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const load = useCallback(async () => {
    try {
      setConvo(await getConversation(cid));
    } catch {
      /* silencieux */
    }
  }, [cid]);

  useEffect(() => {
    if (!user || !cid) return;
    load();
    const iv = setInterval(load, 4000);
    return () => clearInterval(iv);
  }, [user, cid, load]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [convo]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const body = text.trim();
    if (!body || sending) return;
    setText("");
    setSending(true);
    try {
      setConvo(await sendConversationMessage(cid, body));
    } catch {
      setText(body);
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-2xl px-4 py-8">
          {!isLoading && !user ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <LogIn className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour accéder à vos messages.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Se connecter
              </Link>
            </div>
          ) : (
            <div className="flex h-[70vh] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              {/* En-tête conversation */}
              <div className="flex items-center gap-3 border-b border-border p-4">
                <Link
                  href="/messages"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Link>
                <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-harvest-600 font-bold text-white">
                  {convo?.with.name?.[0]?.toUpperCase() ?? "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate font-semibold">
                    {convo?.with.name ?? "…"}
                  </div>
                  {convo?.announcement && (
                    <Link
                      href={`/annonces/${convo.announcement.id}`}
                      className="inline-flex items-center gap-1 truncate text-xs text-brand-700 hover:underline"
                    >
                      <Tag className="h-3 w-3" />
                      {convo.announcement.title}
                    </Link>
                  )}
                </div>
              </div>

              {/* Messages */}
              <div ref={scrollRef} className="flex-1 space-y-2.5 overflow-y-auto bg-sand-50 p-4">
                {!convo ? (
                  <div className="grid h-full place-items-center text-muted-foreground">
                    <Loader2 className="h-5 w-5 animate-spin" />
                  </div>
                ) : convo.messages.length === 0 ? (
                  <div className="grid h-full place-items-center px-6 text-center text-sm text-muted-foreground">
                    Démarrez la conversation avec {convo.with.name}.
                  </div>
                ) : (
                  convo.messages.map((m) => (
                    <div key={m.id} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2 text-sm ${
                          m.mine
                            ? "rounded-tr-sm bg-gradient-to-br from-brand-500 to-brand-600 text-white"
                            : "rounded-tl-sm bg-white text-foreground ring-1 ring-border"
                        }`}
                      >
                        {m.body}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Saisie */}
              <form onSubmit={send} className="flex items-center gap-2 border-t border-border p-3">
                <input
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Votre message…"
                  className="min-w-0 flex-1 rounded-full bg-secondary/60 px-4 py-2.5 text-sm outline-none focus:bg-secondary"
                />
                <button
                  type="submit"
                  disabled={!text.trim() || sending}
                  aria-label="Envoyer"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-brand-600 text-white transition disabled:opacity-50"
                >
                  {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" strokeWidth={2.5} />}
                </button>
              </form>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
