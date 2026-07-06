/**
 * Client API pour Django backend.
 * Base URL configuree via NEXT_PUBLIC_API_URL (default http://127.0.0.1:8000)
 */

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

// ============================================================
// TYPES
// ============================================================

export interface Seller {
  id: number;
  username: string;
  display_name: string;
  country_code: string | null;
  country_name: string | null;
  picture: string | null;
  rating_avg: number | null;
  ratings_count: number;
}

export interface Announcement {
  id: number;
  reference: string;
  title: string;
  type: "vente" | "achat" | "autre";
  type_display: string;
  is_organic: boolean;
  quantity: number | null;
  unit: string | null;
  country_code: string | null;
  country_name: string | null;
  category_name: string | null;
  subcategory_name: string | null;
  seller: Seller;
  image_url: string | null;
  published_at: string;
}

export interface AnnouncementDetail extends Announcement {
  description: string;
  caracteristiques: string;
  product_name: string;
  variety: string;
  brand: string;
  shipping_conditions: string;
  transaction_details: string;
}

export interface SubCategory {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
  subcategories: SubCategory[];
  annonces_count: number;
}

export interface StatsSummary {
  producteurs: number;
  pays_africains: number;
  filieres: number;
  commission: string;
  annonces_actives: number;
  pays_actifs: number;
}

export interface CountriesActivity {
  counts: Record<string, number>;
}

// ============================================================
// FETCHERS
// ============================================================

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: { revalidate: 60 }, // ISR cache 60s
    headers: { "Content-Type": "application/json" },
    // Évite tout blocage (build Vercel / SSR) si l'API est lente ou injoignable.
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    throw new Error(`API ${path} returned ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export async function getStats(): Promise<StatsSummary> {
  return fetchJson<StatsSummary>("/api/stats/summary/");
}

export async function getCountriesActivity(): Promise<CountriesActivity> {
  return fetchJson<CountriesActivity>("/api/countries/activity/");
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson<{ results?: Category[] } | Category[]>(
    "/api/categories/"
  );
  // DRF ViewSet with pagination retourne { results: [] } sinon [] direct
  return Array.isArray(data) ? data : data.results || [];
}

export async function getAnnouncements(params?: {
  q?: string;
  type?: string;
  category?: number;
  country?: string;
  bio?: boolean;
  sort?: "recent" | "popular" | "old";
  limit?: number;
}): Promise<Announcement[]> {
  const search = new URLSearchParams();
  if (params?.q) search.set("q", params.q);
  if (params?.type) search.set("type", params.type);
  if (params?.category) search.set("category", String(params.category));
  if (params?.country) search.set("country", params.country);
  if (params?.bio) search.set("bio", "1");
  if (params?.sort) search.set("sort", params.sort);

  const qs = search.toString();
  const data = await fetchJson<
    { results?: Announcement[] } | Announcement[]
  >(`/api/announcements/${qs ? "?" + qs : ""}`);
  const list = Array.isArray(data) ? data : data.results || [];
  return params?.limit ? list.slice(0, params.limit) : list;
}

export async function getAnnouncementDetail(
  id: number
): Promise<AnnouncementDetail> {
  return fetchJson<AnnouncementDetail>(`/api/announcements/${id}/`);
}

// ============================================================
// PRODUCER OF THE MONTH
// ============================================================

export interface ProducerOfMonth {
  producer: {
    id: number;
    username: string;
    display_name: string;
    country_code: string | null;
    country_name: string | null;
    picture: string | null;
    rating_avg: number | null;
    ratings_count: number;
    user_type: string;
    years_active: number;
    transactions_count: number;
    trust_badges_count: number;
    city: string | null;
  } | null;
  featured: Announcement | null;
}

export async function getProducerOfMonth(): Promise<ProducerOfMonth> {
  return fetchJson<ProducerOfMonth>("/api/producer-of-month/");
}

// ============================================================
// SPOTLIGHT CATEGORY
// ============================================================

export interface SpotlightCategory {
  id: number;
  name: string;
  annonces_count: number;
  cover_image: string | null;
  subcategories: SubCategory[];
}

export async function getSpotlightCategory(): Promise<SpotlightCategory | null> {
  const data = await fetchJson<SpotlightCategory | null>(
    "/api/spotlight-category/"
  );
  return data;
}

// ============================================================
// ÉVÉNEMENTS & SALONS
// ============================================================

export interface EventItem {
  id: number;
  titre: string;
  slug: string;
  description_fr: string;
  image_fr: string | null;
  image_en: string | null;
  image_it: string | null;
  date_debut: string;
  date_fin: string;
  est_actif: boolean;
  nb_interesses: number;
  prochain_evenement: boolean;
}

export async function getEvents(limit?: number): Promise<EventItem[]> {
  const data = await fetchJson<{ results?: EventItem[] } | EventItem[]>(
    "/api/evenements/"
  );
  const list = Array.isArray(data) ? data : data.results || [];
  // Les événements à venir d'abord, puis les plus récents
  const sorted = [...list].sort((a, b) => {
    if (a.prochain_evenement !== b.prochain_evenement) {
      return a.prochain_evenement ? -1 : 1;
    }
    return +new Date(b.date_debut) - +new Date(a.date_debut);
  });
  return limit ? sorted.slice(0, limit) : sorted;
}

export interface EventQuestion {
  id: number;
  libelle: string;
  type_question: string;
  options: unknown;
  obligatoire: boolean;
  aide_texte: string | null;
}

export interface EventSection {
  id: number;
  nom: string;
  description: string | null;
  ordre: number;
  questions: EventQuestion[];
}

export interface EventDetail extends EventItem {
  description_en: string;
  description_it: string;
  date_fin: string;
  questionnaire: {
    id: number;
    nom: string;
    actif: boolean;
    sections: EventSection[];
  } | null;
}

export async function getEventDetail(slug: string): Promise<EventDetail | null> {
  try {
    return await fetchJson<EventDetail>(
      `/api/evenements/${encodeURIComponent(slug)}/`
    );
  } catch {
    return null;
  }
}
