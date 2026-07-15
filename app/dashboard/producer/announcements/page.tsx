"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Package,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
  FileText,
  XCircle,
} from "lucide-react";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import {
  fetchMyAnnouncements,
  type MyAnnouncementsPayload,
  type MyAnnItem,
} from "@/lib/auth";
import { useAuth } from "@/lib/auth-context";

type Group = {
  key: keyof MyAnnouncementsPayload;
  label: string;
  icon: typeof Package;
  dot: string;
  color: string;
};

const GROUPS: Group[] = [
  { key: "approved", label: "En ligne", icon: CheckCircle2, dot: "bg-harvest-500", color: "text-harvest-700" },
  { key: "pending_first", label: "En validation", icon: Clock, dot: "bg-amber-500", color: "text-amber-700" },
  { key: "pending_second", label: "En validation (2)", icon: Clock, dot: "bg-amber-500", color: "text-amber-700" },
  { key: "draft", label: "Brouillons", icon: FileText, dot: "bg-sand-400", color: "text-sand-600" },
  { key: "rejected", label: "Rejetées", icon: XCircle, dot: "bg-destructive", color: "text-destructive" },
  { key: "expired", label: "Expirées", icon: XCircle, dot: "bg-sand-500", color: "text-sand-600" },
];

export default function MyAnnouncementsPage() {
  const { user } = useAuth();
  const [data, setData] = useState<MyAnnouncementsPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchMyAnnouncements()
      .then(setData)
      .catch(() => setData(null))
      .finally(() => setLoading(false));
  }, [user]);

  const total = data?.counts.total ?? 0;

  return (
    <DashboardShell role="producer">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Mes{" "}
            <em className="italic font-normal bg-gradient-to-br from-brand-500 to-brand-700 bg-clip-text text-transparent">
              annonces
            </em>
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gérez toutes vos publications, tous statuts confondus.
          </p>
        </div>
        <Link
          href="/annonces/nouvelle"
          className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5"
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
          Publier
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 animate-pulse rounded-2xl bg-sand-100" />
          ))}
        </div>
      ) : !data || total === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center">
          <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-brand-100 text-brand-700">
            <Package className="h-8 w-8" strokeWidth={1.5} />
          </div>
          <h2 className="font-display text-xl font-semibold">
            Aucune annonce publiée
          </h2>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Publiez votre première annonce en moins de 3 minutes.
          </p>
          <Link
            href="/annonces/nouvelle"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg"
          >
            <Plus className="h-4 w-4" />
            Publier une annonce
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {GROUPS.map((g) => {
            const items = (data[g.key] as MyAnnItem[]) ?? [];
            if (!Array.isArray(items) || items.length === 0) return null;
            return (
              <section key={g.key}>
                <h2 className={`mb-3 inline-flex items-center gap-2 text-sm font-bold ${g.color}`}>
                  <span className={`h-2 w-2 rounded-full ${g.dot}`} />
                  {g.label}
                  <span className="text-muted-foreground">({items.length})</span>
                </h2>
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
                  {items.map((a) => (
                    <li key={a.id}>
                      <Link
                        href={`/annonces/${a.id}`}
                        className="group flex items-center gap-4 p-4 transition hover:bg-sand-50/70"
                      >
                        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-sand-200">
                          {a.image_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={a.image_url} alt="" className="h-full w-full object-cover" />
                          ) : (
                            <div className="grid h-full w-full place-items-center text-sand-500">
                              <Package className="h-6 w-6" />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-display font-semibold tracking-tight">
                            {a.title}
                          </div>
                          <div className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{a.type_display}</span>
                            {a.quantity != null && (
                              <>
                                <span>·</span>
                                <span>
                                  {a.quantity.toLocaleString("fr-FR")}{" "}
                                  <em className="italic text-sand-500">{a.unit}</em>
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-1 group-hover:text-brand-600" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}
