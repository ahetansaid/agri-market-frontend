# Agri Market Africa — Frontend Next.js

Frontend moderne de la marketplace agricole panafricaine, construit en
Next.js 15 + Tailwind 4 + Motion + shadcn/ui.

Consomme l'API Django REST du repo
[`marketplace`](https://github.com/IDA-International/marketplace) (branche `delta`).

---

## 🚀 Démarrage rapide

### 1. Backend Django (dans un autre terminal)

```powershell
# Depuis c:\xampp\htdocs\marketplace
python manage.py runserver 8000
```

L'API doit répondre sur `http://127.0.0.1:8000/api/stats/summary/`

### 2. Frontend Next.js

```powershell
# Depuis c:\xampp\htdocs\agri-market-frontend

# Installer les dépendances (une seule fois)
npm install

# Lancer le serveur de développement
npm run dev
```

Le site est accessible sur **http://localhost:3000**

---

## 🎨 Design System — "African Terra"

| Token | Value | Usage |
|---|---|---|
| `brand-600` | `#ea580c` | Primary CTA orange |
| `brand-700` | `#c2410c` | Actif / pressed |
| `harvest-600` | `#16a34a` | Badges Bio, Vérifié |
| `sand-50 → sand-900` | Neutrals chauds | Backgrounds, texte |
| `gold` `#eab308` | Or éditorial | Étoiles rating |
| `terracotta` `#dc2626` | Rouge terre | Accents Made in Africa |
| `savanna` `#84cc16` | Vert-jaune | Success subtils |

**Typos** :
- Display : **Fraunces** (serif éditorial variable, axes opsz + SOFT)
- Sans : **Inter** (moderne, très lisible)
- Mono : **JetBrains Mono**

Le light/dark mode est natif via `next-themes` (à activer via `<ThemeProvider>`).

---

## 📁 Structure

```
agri-market-frontend/
├── app/
│   ├── globals.css       # Palette African Terra + tokens shadcn
│   ├── layout.tsx        # Root layout + fonts
│   └── page.tsx          # Home (fetch API Django côté serveur)
├── components/
│   ├── layout/
│   │   ├── header.tsx    # Header sticky avec brand + nav + actions
│   │   └── footer.tsx    # Footer 4 cols + trust bar
│   └── home/
│       ├── hero.tsx      # Hero animé avec blobs + stats
│       └── announcement-card.tsx  # Card annonce premium
├── lib/
│   └── api.ts            # Client TypeScript pour Django API
├── public/
│   └── logo.png          # Logo Agri Market Africa
├── .env.local            # NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
└── next.config.ts        # Config images remote patterns
```

---

## 🔌 Endpoints Django API consommés

Base URL configurable via `NEXT_PUBLIC_API_URL` (default `http://127.0.0.1:8000`)

| Endpoint | Description | Utilisé par |
|---|---|---|
| `GET /api/stats/summary/` | Stats globales (producteurs, filières, etc.) | Hero |
| `GET /api/announcements/` | Liste annonces avec filtres (q, type, cat, country, bio, sort) | Home + Listing |
| `GET /api/announcements/{id}/` | Détail annonce | Page détail |
| `GET /api/categories/` | Liste catégories + subcategories | Filtres |
| `GET /api/countries/activity/` | Nb annonces par pays | Carte d'Afrique |
| `POST /api/auth/token/` | Obtenir JWT (login) | Auth |
| `POST /api/auth/token/refresh/` | Renouveler JWT | Auth |

---

## 📦 Stack technique

| Layer | Choix |
|---|---|
| **Framework** | Next.js 16 (App Router, Server Components, Turbopack) |
| **Language** | TypeScript |
| **Style** | Tailwind CSS 4 (via `@theme` inline) |
| **UI** | shadcn/ui (à venir : `npx shadcn add ...`) |
| **Animations** | Motion (ex-Framer Motion) |
| **State server** | React Query (@tanstack/react-query) |
| **State client** | Zustand |
| **Forms** | React Hook Form + Zod |
| **Icons** | Lucide React |
| **Toasts** | Sonner |
| **Dark mode** | next-themes |
| **Flags** | flag-icons |

---

## 🗺️ Roadmap sessions

- ✅ **Session 1 (cette session)** — Setup Next.js, API Django, Home V1, Layout
- 🚧 **Session 2** — Page listing complète, Page détail, Producer of Month, Africa Map
- 🚧 **Session 3** — Auth (login/register JWT), Dashboards producteur/acheteur
- 🚧 **Session 4** — RFQ, Chat/Messaging, Sample Request

---

## 🌍 Déploiement

**Frontend** : Vercel (build auto sur push GitHub)
**Backend** : reste sur XAMPP (dev) / O2switch (prod)

Ajouter en production dans `next.config.ts` :

```ts
{
  protocol: "https",
  hostname: "api.idamarketplace.com",
  pathname: "/media/**"
}
```

Et ajouter le domaine du frontend dans `CORS_ALLOWED_ORIGINS` de Django.

---

**Co-authored by IDA International × Claude Opus 4.7**
