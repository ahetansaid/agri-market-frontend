import { authFetch, getAccessToken } from "./auth";
import { API_URL } from "./api";

// ============================================================
// ADMIN — Page À propos (édition, réservé au staff)
// ============================================================

export interface AboutEditValue {
  id?: number;
  icon: string;
  title: string;
  description: string;
}

export interface AboutEdit {
  title: string;
  intro: string;
  vision_title: string;
  vision: string;
  perspectives_title: string;
  perspectives: string;
  values_title: string;
  mission_title: string;
  mission: string;
  values: AboutEditValue[];
}

/**
 * L'édition cible la LANGUE ACTIVE (Accept-Language + modeltranslation côté
 * Django) : changer la langue dans le header change la traduction éditée.
 */
export function fetchAdminAbout(locale: string): Promise<AboutEdit> {
  return authFetch<AboutEdit>("/api/admin/about/", {
    headers: { "Accept-Language": locale },
  });
}

export function saveAdminAbout(
  data: AboutEdit,
  locale: string
): Promise<AboutEdit> {
  return authFetch<AboutEdit>("/api/admin/about/", {
    method: "PUT",
    headers: { "Accept-Language": locale },
    body: JSON.stringify(data),
  });
}

// ============================================================
// ADMIN — Modération des annonces
// ============================================================

export interface PendingAnnouncement {
  id: number;
  reference: string;
  title: string;
  type: string;
  type_display: string;
  status: "pending_first" | "pending_second" | string;
  status_display: string;
  author: string;
  image_url: string | null;
  description: string;
  submitted_at: string | null;
  can_validate: boolean;
}

export function fetchPendingAnnouncements(): Promise<{
  count: number;
  results: PendingAnnouncement[];
}> {
  return authFetch("/api/admin/announcements/pending/");
}

export function moderateAnnouncement(
  id: number,
  action: "approve" | "reject",
  reason?: string
): Promise<PendingAnnouncement> {
  return authFetch(`/api/admin/announcements/${id}/moderate/`, {
    method: "POST",
    body: JSON.stringify({ action, reason }),
  });
}

// ============================================================
// ADMIN — Événements (CRUD)
// ============================================================

export interface AdminEvent {
  id: number;
  slug: string;
  titre: string;
  description_fr: string;
  image_fr: string | null;
  date_debut: string;
  date_fin: string;
  est_actif: boolean;
  prochain_evenement: boolean;
}

export async function fetchAdminEvents(): Promise<AdminEvent[]> {
  // Avec un JWT staff, le ViewSet renvoie TOUS les événements (actifs + passés).
  const data = await authFetch<{ results?: AdminEvent[] } | AdminEvent[]>(
    "/api/evenements/"
  );
  return Array.isArray(data) ? data : data.results ?? [];
}

/**
 * Crée (POST) ou met à jour (PATCH) un événement en multipart (permet
 * l'upload d'image). On n'utilise pas authFetch ici car il force le
 * Content-Type JSON — en multipart, le navigateur doit poser la frontière.
 */
export async function saveAdminEvent(
  form: FormData,
  slug?: string
): Promise<AdminEvent> {
  const token = getAccessToken();
  const path = slug ? `/api/evenements/${slug}/` : "/api/evenements/";
  const res = await fetch(`${API_URL}${path}`, {
    method: slug ? "PATCH" : "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    body: form,
  });
  if (!res.ok) {
    let msg = `Erreur ${res.status}`;
    try {
      const d = await res.json();
      msg =
        d.detail ||
        Object.entries(d)
          .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(" ") : v}`)
          .join(" · ") ||
        msg;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}

export async function deleteAdminEvent(slug: string): Promise<void> {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}/api/evenements/${slug}/`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok && res.status !== 204) {
    throw new Error(`Suppression impossible (${res.status}).`);
  }
}

// ============================================================
// ADMIN — Utilisateurs
// ============================================================

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  telephone: string;
  display_name: string;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  user_type: string | null;
  country_name: string | null;
  date_joined: string;
}

export interface AdminUserPatch {
  is_active?: boolean;
  is_staff?: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
  telephone?: string;
}

export function fetchAdminUsers(
  q?: string
): Promise<{ count: number; results: AdminUser[] }> {
  const qs = q ? `?q=${encodeURIComponent(q)}` : "";
  return authFetch(`/api/admin/users/${qs}`);
}

export function updateAdminUser(
  id: number,
  patch: AdminUserPatch
): Promise<AdminUser> {
  return authFetch(`/api/admin/users/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  });
}

export async function deleteAdminUser(id: number): Promise<void> {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}/api/admin/users/${id}/`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  if (!res.ok && res.status !== 204) {
    throw new Error(`Suppression impossible (${res.status}).`);
  }
}

export function resetAdminUserPassword(
  id: number
): Promise<{ detail: string }> {
  return authFetch(`/api/admin/users/${id}/reset-password/`, {
    method: "POST",
  });
}
