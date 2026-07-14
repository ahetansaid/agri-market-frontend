/**
 * Auth client-side (JWT).
 * Tokens stockes en localStorage + envoyes en Authorization: Bearer.
 * Refresh automatique quand access token expire.
 */

import { API_URL } from "./api";

const ACCESS_KEY = "ama_access";
const REFRESH_KEY = "ama_refresh";

// ============================================================
// TYPES
// ============================================================

export interface Me {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  telephone: string | null;
  ville: string | null;
  user_type: string;
  date_joined: string;
  country_code: string | null;
  country_name: string | null;
  picture_url: string | null;
  display_name: string;
  rating_avg: number | null;
  ratings_count: number;
  transactions_count: number;
  years_active: number;
}

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  telephone?: string;
  pays?: string;
  ville?: string;
  user_type?: "individu" | "entreprise";
}

export interface AuthResult {
  user: Me;
  access: string;
  refresh: string;
}

// ============================================================
// STORAGE HELPERS
// ============================================================

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(REFRESH_KEY);
}

export function setTokens(access: string, refresh: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ACCESS_KEY, access);
  localStorage.setItem(REFRESH_KEY, refresh);
  // Cookie leger pour que le middleware Next.js puisse detecter l'auth
  document.cookie = `ama_auth=1; path=/; max-age=${60 * 60 * 24 * 14}; SameSite=Lax`;
}

export function clearTokens() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  document.cookie = "ama_auth=; path=/; max-age=0; SameSite=Lax";
}

// ============================================================
// FETCH AUTHENTIFIE + AUTO-REFRESH
// ============================================================

async function refreshAccess(): Promise<string | null> {
  const refresh = getRefreshToken();
  if (!refresh) return null;
  try {
    const res = await fetch(`${API_URL}/api/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.access) {
      localStorage.setItem(ACCESS_KEY, data.access);
      if (data.refresh) localStorage.setItem(REFRESH_KEY, data.refresh);
      return data.access;
    }
  } catch {
    return null;
  }
  return null;
}

export async function authFetch<T = unknown>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const url = path.startsWith("http") ? path : `${API_URL}${path}`;
  let access = getAccessToken();

  const doFetch = (token: string | null) =>
    fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...init.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  let res = await doFetch(access);

  // Auto-refresh si 401
  if (res.status === 401 && access) {
    const newAccess = await refreshAccess();
    if (newAccess) {
      res = await doFetch(newAccess);
    } else {
      clearTokens();
      throw new AuthError("Session expirée. Reconnectez-vous.");
    }
  }

  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      msg = data.detail || data.errors || msg;
    } catch {
      /* ignore */
    }
    throw new AuthError(typeof msg === "string" ? msg : JSON.stringify(msg));
  }

  return (await res.json()) as T;
}

export class AuthError extends Error {}

// ============================================================
// API AUTH
// ============================================================

export async function login(
  username: string,
  password: string
): Promise<AuthResult> {
  const res = await fetch(`${API_URL}/api/auth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    let msg = "Identifiants invalides";
    try {
      const data = await res.json();
      msg = data.detail || msg;
    } catch {
      /* ignore */
    }
    throw new AuthError(msg);
  }
  const tokens = await res.json();
  setTokens(tokens.access, tokens.refresh);
  // Recup profil
  const user = await authFetch<Me>("/api/me/");
  return { user, access: tokens.access, refresh: tokens.refresh };
}

export async function register(
  payload: RegisterPayload
): Promise<{ detail: string; email: string }> {
  const res = await fetch(`${API_URL}/api/auth/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    let msg = "Inscription impossible";
    try {
      const data = await res.json();
      if (data.errors) {
        // Flatten field errors
        const first = Object.entries(data.errors)[0];
        if (first) {
          const [field, errs] = first;
          const list = Array.isArray(errs) ? errs.join(" ") : String(errs);
          msg = `${field}: ${list}`;
        }
      }
    } catch {
      /* ignore */
    }
    throw new AuthError(msg);
  }
  // Plus d'auto-login : le compte doit d'abord être activé par email.
  return res.json();
}

/** Active un compte via le lien reçu par email (uid + token). */
export async function activateAccount(
  uid: string,
  token: string
): Promise<{ detail: string }> {
  const res = await fetch(`${API_URL}/api/auth/activate/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ uid, token }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new AuthError(data.detail || "Activation impossible.");
  return data as { detail: string };
}

export function logout() {
  clearTokens();
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
}

/** Publie une annonce (multipart, authentifié). */
export async function createAnnouncement(
  form: FormData
): Promise<{ id: number; reference: string; title: string }> {
  const url = `${API_URL}/api/me/announcements/create/`;
  const doFetch = (token: string | null) =>
    fetch(url, {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form,
    });

  let access = getAccessToken();
  let res = await doFetch(access);

  if (res.status === 401 && access) {
    const newAccess = await refreshAccess();
    if (newAccess) {
      res = await doFetch(newAccess);
    } else {
      clearTokens();
      throw new AuthError("Session expirée. Reconnectez-vous.");
    }
  }

  if (!res.ok) {
    let msg = `Erreur ${res.status}`;
    try {
      const data = await res.json();
      if (data.errors) {
        const first = Object.entries(data.errors)[0];
        if (first) {
          const [field, errs] = first;
          const list = Array.isArray(errs) ? errs.join(" ") : String(errs);
          msg = `${field} : ${list}`;
        }
      } else if (data.detail) {
        msg = data.detail;
      }
    } catch {
      /* ignore */
    }
    throw new AuthError(msg);
  }

  return res.json();
}

export async function fetchMe(): Promise<Me | null> {
  if (!getAccessToken()) return null;
  try {
    return await authFetch<Me>("/api/me/");
  } catch {
    return null;
  }
}

// ============================================================
// DASHBOARD DATA FETCHERS (authentifies)
// ============================================================

export interface MyAnnouncementsPayload {
  draft: unknown[];
  pending_first: unknown[];
  pending_second: unknown[];
  approved: unknown[];
  rejected: unknown[];
  expired: unknown[];
  counts: {
    draft: number;
    pending: number;
    approved: number;
    rejected: number;
    total: number;
  };
}

export async function fetchMyAnnouncements(): Promise<MyAnnouncementsPayload> {
  return authFetch<MyAnnouncementsPayload>("/api/me/announcements/");
}

export interface MyRatingsPayload {
  summary: { avg: number | null; count: number };
  results: {
    id: number;
    stars: number;
    comment: string;
    would_recommend: boolean;
    created_at: string;
    author_name: string;
    author_country: string | null;
  }[];
}

export async function fetchMyRatings(): Promise<MyRatingsPayload> {
  return authFetch<MyRatingsPayload>("/api/me/ratings/");
}

// ============================================================
// MESSAGERIE SERVICE CLIENT
// ============================================================

export interface SupportMsg {
  id: number;
  body: string;
  from_staff: boolean;
  created_at: string;
}

export async function getSupportMessages(): Promise<SupportMsg[]> {
  const data = await authFetch<{ messages: SupportMsg[] }>(
    "/api/support/messages/"
  );
  return data.messages;
}

export async function sendSupportMessage(body: string): Promise<SupportMsg[]> {
  const data = await authFetch<{ messages: SupportMsg[] }>(
    "/api/support/messages/",
    { method: "POST", body: JSON.stringify({ body }) }
  );
  return data.messages;
}
