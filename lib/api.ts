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
