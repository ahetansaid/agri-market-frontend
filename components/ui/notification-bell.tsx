"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  getNotifications,
  markNotificationsRead,
  type AppNotification,
} from "@/lib/auth";
import {
  Bell,
  MessageCircle,
  Package,
  Star,
  Info,
  CheckCheck,
} from "lucide-react";

const ICONS = {
  message: MessageCircle,
  announcement: Package,
  review: Star,
  system: Info,
} as const;

function timeAgo(iso: string): string {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  return `il y a ${Math.floor(s / 86400)} j`;
}

export function NotificationBell() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const [items, setItems] = useState<AppNotification[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  // Sondage léger du compteur
  useEffect(() => {
    if (!user) return;
    let alive = true;
    const tick = () =>
      getNotifications().then((d) => {
        if (!alive) return;
        setUnread(d.unread);
        setItems(d.results);
      });
    tick();
    const iv = setInterval(tick, 30000);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, [user]);

  // Fermeture au clic extérieur / Échap
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!user) return null;

  const markAll = async () => {
    setUnread(await markNotificationsRead());
    setItems((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={`Notifications${unread ? ` (${unread} non lues)` : ""}`}
        aria-expanded={open}
        className="relative grid place-items-center rounded-full p-2.5 text-sand-600 transition hover:bg-secondary hover:text-brand-700"
      >
        <Bell className="h-5 w-5" strokeWidth={2} />
        {unread > 0 && (
          <span className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-coral px-1 text-[10px] font-bold leading-none text-white shadow-sm">
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <h2 className="font-display text-sm font-semibold">Notifications</h2>
            {unread > 0 && (
              <button
                type="button"
                onClick={markAll}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Tout marquer comme lu
              </button>
            )}
          </div>

          <div className="max-h-[22rem] overflow-y-auto">
            {items.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-muted-foreground">
                Aucune notification pour le moment.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {items.map((n) => {
                  const Icon = ICONS[n.kind] ?? Info;
                  const content = (
                    <div
                      className={`flex gap-3 px-4 py-3 transition hover:bg-sand-50 ${
                        n.is_read ? "" : "bg-brand-50/40"
                      }`}
                    >
                      <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand-100 text-brand-700">
                        <Icon className="h-4 w-4" strokeWidth={2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start gap-2">
                          <p className="flex-1 text-sm font-semibold leading-snug">
                            {n.title}
                          </p>
                          {!n.is_read && (
                            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-coral" />
                          )}
                        </div>
                        {n.body && (
                          <p className="mt-0.5 line-clamp-2 whitespace-pre-wrap text-xs text-muted-foreground">
                            {n.body}
                          </p>
                        )}
                        <p className="mt-1 text-[11px] text-muted-foreground/70">
                          {timeAgo(n.created_at)}
                        </p>
                      </div>
                    </div>
                  );
                  return (
                    <li key={n.id}>
                      {n.link && n.link.startsWith("/") ? (
                        <Link href={n.link} onClick={() => setOpen(false)}>
                          {content}
                        </Link>
                      ) : (
                        content
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
