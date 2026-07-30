"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  fetchAdminUsers,
  updateAdminUser,
  type AdminUser,
} from "@/lib/admin";
import { AuthError } from "@/lib/auth";
import {
  ArrowLeft,
  Loader2,
  Search,
  Users,
  ShieldCheck,
  ShieldOff,
  UserCheck,
  UserX,
  Crown,
} from "lucide-react";

export default function AdminUsersPage() {
  const { user: me } = useAuth();
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  const load = useCallback(async (query: string) => {
    setError(null);
    try {
      const data = await fetchAdminUsers(query);
      setUsers(data.results);
      setCount(data.count);
    } catch (e) {
      setError(e instanceof AuthError ? e.message : "Chargement impossible.");
      setUsers([]);
    }
  }, []);

  useEffect(() => {
    load("");
  }, [load]);

  // Recherche différée.
  useEffect(() => {
    const t = setTimeout(() => load(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q, load]);

  const patch = async (
    u: AdminUser,
    body: { is_active?: boolean; is_staff?: boolean }
  ) => {
    setBusy(u.id);
    setError(null);
    try {
      const updated = await updateAdminUser(u.id, body);
      setUsers((list) =>
        list ? list.map((x) => (x.id === u.id ? updated : x)) : list
      );
    } catch (e) {
      setError(e instanceof AuthError ? e.message : "Action impossible.");
    } finally {
      setBusy(null);
    }
  };

  const canSuper = !!me?.is_superuser;

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/dashboard/admin"
        className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Administration
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm">
          <Users className="h-5 w-5" strokeWidth={2} />
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Utilisateurs
          </h1>
          <p className="text-sm text-muted-foreground">
            {count} compte{count > 1 ? "s" : ""}.
          </p>
        </div>
      </div>

      {/* Recherche */}
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Rechercher par nom ou email…"
          className="w-full rounded-full border border-border bg-card px-4 py-2.5 pl-10 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
        />
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-destructive/25 bg-destructive/5 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!canSuper && (
        <p className="mb-4 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-700">
          Vous pouvez activer/désactiver des comptes. Accorder le rôle admin est
          réservé aux super-admins.
        </p>
      )}

      {users === null ? (
        <div className="grid place-items-center py-20 text-muted-foreground">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : users.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
          Aucun utilisateur trouvé.
        </div>
      ) : (
        <div className="space-y-2">
          {users.map((u) => {
            const isSelf = u.id === me?.id;
            const isBusy = busy === u.id;
            const lockedTarget = u.is_superuser && !canSuper;
            return (
              <div
                key={u.id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-center"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sand-700 to-sand-900 font-display text-sm font-bold text-white">
                  {u.display_name[0]?.toUpperCase() ?? "?"}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="truncate font-semibold">
                      {u.display_name}
                    </span>
                    {isSelf && (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                        Vous
                      </span>
                    )}
                    {u.is_superuser && (
                      <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        <Crown className="h-2.5 w-2.5" />
                        Super-admin
                      </span>
                    )}
                    {u.is_staff && !u.is_superuser && (
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                        Admin
                      </span>
                    )}
                    {!u.is_active && (
                      <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                        Désactivé
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-muted-foreground">
                    {u.email}
                  </p>
                </div>

                {/* Actions */}
                {!isSelf && !lockedTarget && (
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {/* Rôle admin (super-admin uniquement) */}
                    {canSuper && !u.is_superuser && (
                      <button
                        disabled={isBusy}
                        onClick={() => patch(u, { is_staff: !u.is_staff })}
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                          u.is_staff
                            ? "border-border text-muted-foreground hover:bg-secondary"
                            : "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
                        }`}
                      >
                        {u.is_staff ? (
                          <>
                            <ShieldOff className="h-3.5 w-3.5" />
                            Retirer admin
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Promouvoir admin
                          </>
                        )}
                      </button>
                    )}
                    {/* Activation */}
                    <button
                      disabled={isBusy}
                      onClick={() => patch(u, { is_active: !u.is_active })}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                        u.is_active
                          ? "border-border text-destructive hover:bg-destructive/5"
                          : "border-harvest-200 bg-harvest-50 text-harvest-700 hover:bg-harvest-100"
                      }`}
                    >
                      {isBusy ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : u.is_active ? (
                        <>
                          <UserX className="h-3.5 w-3.5" />
                          Désactiver
                        </>
                      ) : (
                        <>
                          <UserCheck className="h-3.5 w-3.5" />
                          Réactiver
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
