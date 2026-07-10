"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { logout } from "@/lib/auth";
import { LogIn, UserPlus, LogOut, LayoutDashboard } from "lucide-react";

/**
 * Liens d'authentification contextuels (S'inscrire / Se connecter quand
 * déconnecté, Mon espace / Se déconnecter quand connecté).
 * Utilisé dans le header et le footer.
 */
export function AuthLinks({ variant = "header" }: { variant?: "header" | "footer" }) {
  const { user } = useAuth();

  if (variant === "footer") {
    const cls =
      "text-sm text-sand-300 transition hover:pl-1 hover:text-harvest-300";
    return (
      <ul className="space-y-2.5">
        {user ? (
          <>
            <li>
              <Link href="/dashboard" className={cls}>
                Mon espace
              </Link>
            </li>
            <li>
              <button type="button" onClick={logout} className={cls}>
                Se déconnecter
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className={cls}>
                Se connecter
              </Link>
            </li>
            <li>
              <Link href="/register" className={cls}>
                S&apos;inscrire
              </Link>
            </li>
          </>
        )}
      </ul>
    );
  }

  // Header
  if (user) {
    return (
      <div className="flex items-center gap-1">
        <Link
          href="/dashboard"
          className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-brand-700 lg:inline-flex"
        >
          <LayoutDashboard className="h-4 w-4" strokeWidth={2} />
          Mon espace
        </Link>
        <button
          type="button"
          onClick={logout}
          aria-label="Se déconnecter"
          className="grid place-items-center rounded-full p-2.5 text-sand-600 transition hover:bg-secondary hover:text-brand-700"
        >
          <LogOut className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>
    );
  }

  return (
    <div className="hidden items-center gap-1.5 md:flex">
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-foreground/80 transition hover:bg-secondary hover:text-brand-700"
      >
        <LogIn className="h-4 w-4" strokeWidth={2} />
        Se connecter
      </Link>
      <Link
        href="/register"
        className="inline-flex items-center gap-1.5 rounded-full bg-harvest-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-harvest-700"
      >
        <UserPlus className="h-4 w-4" strokeWidth={2.5} />
        S&apos;inscrire
      </Link>
    </div>
  );
}
