import { authFetch } from "./auth";

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
