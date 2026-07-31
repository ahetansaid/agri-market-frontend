"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import {
  fetchAdminUsers,
  updateAdminUser,
  deleteAdminUser,
  resetAdminUserPassword,
  type AdminUser,
  type AdminUserPatch,
} from "@/lib/admin";
import { AuthError, type Me } from "@/lib/auth";
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
  Pencil,
  Save,
  KeyRound,
  Trash2,
  Check,
  X,
} from "lucide-react";

export default function AdminUsersPage() {
  const { user: me } = useAuth();
  const [q, setQ] = useState("");
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [count, setCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

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
    const t = setTimeout(() => load(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q, load]);

  const canSuper = !!me?.is_superuser;
  const onUpdated = (u: AdminUser) =>
    setUsers((list) => (list ? list.map((x) => (x.id === u.id ? u : x)) : list));
  const onDeleted = (id: number) =>
    setUsers((list) => (list ? list.filter((x) => x.id !== id) : list));

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
          Accorder le rôle admin est réservé aux super-admins.
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
          {users.map((u) => (
            <UserRow
              key={u.id}
              user={u}
              me={me}
              canSuper={canSuper}
              onUpdated={onUpdated}
              onDeleted={onDeleted}
              onError={setError}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function UserRow({
  user,
  me,
  canSuper,
  onUpdated,
  onDeleted,
  onError,
}: {
  user: AdminUser;
  me: Me | null;
  canSuper: boolean;
  onUpdated: (u: AdminUser) => void;
  onDeleted: (id: number) => void;
  onError: (m: string | null) => void;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [confirmDel, setConfirmDel] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [telephone, setTelephone] = useState(user.telephone);

  const isSelf = user.id === me?.id;
  const lockedTarget = user.is_superuser && !canSuper;
  const editable = !isSelf && !lockedTarget;

  const run = async (fn: () => Promise<void>) => {
    setBusy(true);
    onError(null);
    setMsg(null);
    try {
      await fn();
    } catch (e) {
      onError(e instanceof Error ? e.message : "Action impossible.");
    } finally {
      setBusy(false);
    }
  };

  const patch = (body: AdminUserPatch) =>
    run(async () => onUpdated(await updateAdminUser(user.id, body)));

  const saveProfile = () =>
    run(async () => {
      const updated = await updateAdminUser(user.id, {
        first_name: firstName,
        last_name: lastName,
        email,
        telephone,
      });
      onUpdated(updated);
      setMsg("Profil enregistré.");
    });

  const resetPwd = () =>
    run(async () => {
      const r = await resetAdminUserPassword(user.id);
      setMsg(r.detail || "Email de réinitialisation envoyé.");
    });

  const del = () =>
    run(async () => {
      await deleteAdminUser(user.id);
      onDeleted(user.id);
    });

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm">
      {/* Ligne principale */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sand-700 to-sand-900 font-display text-sm font-bold text-white">
          {user.display_name[0]?.toUpperCase() ?? "?"}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="truncate font-semibold">{user.display_name}</span>
            {isSelf && (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                Vous
              </span>
            )}
            {user.is_superuser && (
              <span className="inline-flex items-center gap-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                <Crown className="h-2.5 w-2.5" />
                Super-admin
              </span>
            )}
            {user.is_staff && !user.is_superuser && (
              <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-bold text-brand-700">
                Admin
              </span>
            )}
            {!user.is_active && (
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-bold text-destructive">
                Désactivé
              </span>
            )}
          </div>
          <p className="truncate text-xs text-muted-foreground">{user.email}</p>
        </div>

        {editable && (
          <div className="flex shrink-0 flex-wrap gap-2">
            {canSuper && !user.is_superuser && (
              <button
                disabled={busy}
                onClick={() => patch({ is_staff: !user.is_staff })}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                  user.is_staff
                    ? "border-border text-muted-foreground hover:bg-secondary"
                    : "border-brand-200 bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {user.is_staff ? (
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
            <button
              disabled={busy}
              onClick={() => patch({ is_active: !user.is_active })}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
                user.is_active
                  ? "border-border text-destructive hover:bg-destructive/5"
                  : "border-harvest-200 bg-harvest-50 text-harvest-700 hover:bg-harvest-100"
              }`}
            >
              {user.is_active ? (
                <>
                  <UserX className="h-3.5 w-3.5" /> Désactiver
                </>
              ) : (
                <>
                  <UserCheck className="h-3.5 w-3.5" /> Réactiver
                </>
              )}
            </button>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                open
                  ? "border-brand-300 bg-brand-50 text-brand-700"
                  : "border-border hover:bg-secondary"
              }`}
            >
              <Pencil className="h-3.5 w-3.5" />
              Modifier
            </button>
          </div>
        )}
      </div>

      {/* Éditeur déplié */}
      {open && editable && (
        <div className="space-y-4 border-t border-border bg-sand-50/60 p-4">
          {msg && (
            <p className="inline-flex items-center gap-1.5 rounded-full bg-harvest-50 px-3 py-1 text-xs font-semibold text-harvest-700">
              <Check className="h-3.5 w-3.5" />
              {msg}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Prénom" value={firstName} onChange={setFirstName} />
            <Field label="Nom" value={lastName} onChange={setLastName} />
            <Field label="Email" value={email} onChange={setEmail} type="email" />
            <Field
              label="Téléphone"
              value={telephone}
              onChange={setTelephone}
              placeholder="+229 …"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <div className="flex flex-wrap gap-2">
              <button
                disabled={busy}
                onClick={resetPwd}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold transition hover:bg-secondary disabled:opacity-50"
              >
                <KeyRound className="h-3.5 w-3.5" />
                Réinitialiser le mot de passe
              </button>
              {confirmDel ? (
                <span className="inline-flex items-center gap-1">
                  <button
                    disabled={busy}
                    onClick={del}
                    className="inline-flex items-center gap-1 rounded-full bg-destructive px-3.5 py-2 text-sm font-semibold text-white disabled:opacity-50"
                  >
                    {busy ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <Trash2 className="h-3.5 w-3.5" />
                    )}
                    Confirmer la suppression
                  </button>
                  <button
                    onClick={() => setConfirmDel(false)}
                    className="rounded-full px-2 py-2 text-muted-foreground hover:bg-secondary"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ) : (
                <button
                  onClick={() => setConfirmDel(true)}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-2 text-sm font-semibold text-destructive transition hover:bg-destructive/5"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Supprimer
                </button>
              )}
            </div>
            <button
              disabled={busy}
              onClick={saveProfile}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 disabled:opacity-50"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Enregistrer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-3 focus:ring-brand-500/15"
      />
    </label>
  );
}
