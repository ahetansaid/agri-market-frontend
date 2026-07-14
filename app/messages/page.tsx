"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { useAuth } from "@/lib/auth-context";
import { getMyConversations, type ConvSummary } from "@/lib/auth";
import { MessageCircle, LogIn, Loader2, Tag, ChevronRight } from "lucide-react";

export default function InboxPage() {
  const { user, isLoading } = useAuth();
  const [convos, setConvos] = useState<ConvSummary[] | null>(null);

  useEffect(() => {
    if (!user) return;
    getMyConversations()
      .then(setConvos)
      .catch(() => setConvos([]));
  }, [user]);

  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        <div className="mx-auto max-w-2xl px-4 py-10">
          <h1 className="font-display mb-6 text-3xl font-semibold tracking-tight">
            Mes{" "}
            <em className="text-gradient-brand font-normal italic">messages</em>
          </h1>

          {!isLoading && !user ? (
            <div className="rounded-3xl border border-border bg-card p-10 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                <LogIn className="h-7 w-7" strokeWidth={1.75} />
              </div>
              <p className="text-sm text-muted-foreground">
                Connectez-vous pour voir vos conversations.
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white"
              >
                Se connecter
              </Link>
            </div>
          ) : !convos ? (
            <div className="grid h-40 place-items-center text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : convos.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-sand-100 text-sand-400">
                <MessageCircle className="h-7 w-7" strokeWidth={1.5} />
              </div>
              <h2 className="font-display text-xl font-semibold">
                Aucune conversation
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Contactez un vendeur depuis une annonce pour démarrer un
                échange.
              </p>
              <Link
                href="/annonces"
                className="mt-5 inline-flex rounded-full bg-sand-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Parcourir les annonces
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">
              {convos.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/messages/${c.id}`}
                    className="flex items-center gap-4 p-4 transition hover:bg-sand-50"
                  >
                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-harvest-600 font-bold text-white">
                      {c.with.name?.[0]?.toUpperCase() ?? "?"}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-foreground">
                          {c.with.name}
                        </span>
                        {c.unread > 0 && (
                          <span className="grid h-5 min-w-[1.25rem] place-items-center rounded-full bg-coral px-1.5 text-[11px] font-bold text-white">
                            {c.unread}
                          </span>
                        )}
                      </div>
                      <div className="inline-flex items-center gap-1 truncate text-xs text-brand-700">
                        <Tag className="h-3 w-3" />
                        {c.announcement.title}
                      </div>
                      {c.last && (
                        <div className="truncate text-sm text-muted-foreground">
                          {c.last}
                        </div>
                      )}
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground/40" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
