# Déploiement sur n0c (cPanel) — Agri Market Africa

Guide complet pour héberger **tout** sur n0c : le backend Django (Python App),
le frontend Next.js (Node.js App) et une base **PostgreSQL**.

> Fichiers déjà préparés dans le dépôt :
> - Backend : `idamarketplace/settings/n0c.py` (settings n0c, PostgreSQL) et
>   `passenger_wsgi.py` (point d'entrée Passenger, chemins auto).
> - Frontend : `server.js` (serveur Next.js pour Passenger).

---

## 0. Architecture cible

| Composant | Techno | Domaine | Type d'app cPanel |
|---|---|---|---|
| Frontend | Next.js 16 | `nourdignagrimarket.com` | **Setup Node.js App** |
| Backend | Django 5 | `api.nourdignagrimarket.com` | **Setup Python App** |
| Base | PostgreSQL | (local cPanel) | **PostgreSQL Databases** |

*(On sépare le backend sur un sous-domaine `api.` : plus propre que deux apps
sur le même domaine.)*

---

## 1. Base de données PostgreSQL

Dans cPanel → **PostgreSQL Databases** :
1. **Créer une base** → note son nom complet (ex. `kpfdvptmns_agrimarket`).
2. **Créer un utilisateur** + un **mot de passe fort** (note-les).
3. **Ajouter l'utilisateur à la base** avec **tous les privilèges**.

Retiens : `DB_NAME`, `DB_USER`, `DB_PASSWORD`. L'hôte est `localhost`, port `5432`.

---

## 2. Backend Django (Setup Python App)

### 2.1 Envoyer le code
Mets le dépôt backend (`marketplace`) dans un dossier, ex. `~/agri-api`
(via Git si dispo : `git clone <url> agri-api`, sinon Gestionnaire de fichiers).

### 2.2 Créer l'app Python
cPanel → **Setup Python App** → **Create Application** :
- **Python version** : 3.11 (ou 3.12).
- **Application root** : `agri-api` (le dossier du code).
- **Application URL** : `api.nourdignagrimarket.com`.
- **Application startup file** : `passenger_wsgi.py`.
- **Application Entry point** : `application`.

### 2.3 Variables d'environnement (dans l'écran de l'app Python)
```
DJANGO_SETTINGS_MODULE = idamarketplace.settings.n0c
SECRET_KEY             = <une NOUVELLE clé, générée, jamais celle du repo>
DEBUG                  = False
ALLOWED_HOSTS          = api.nourdignagrimarket.com,nourdignagrimarket.com
DB_ENGINE              = django.db.backends.postgresql
DB_NAME                = kpfdvptmns_agrimarket
DB_USER                = <ton user pg>
DB_PASSWORD            = <ton mdp pg>
DB_HOST                = localhost
DB_PORT                = 5432
DB_SSLMODE             = disable
FRONTEND_URL           = https://nourdignagrimarket.com
CORS_EXTRA_ORIGINS     = https://nourdignagrimarket.com,https://www.nourdignagrimarket.com
CSRF_TRUSTED_ORIGINS   = https://nourdignagrimarket.com,https://www.nourdignagrimarket.com,https://api.nourdignagrimarket.com
DEFAULT_FROM_EMAIL     = agrimarketafrica@nourdignagrimarket.com
# Email (Resend, comme sur Render) :
EMAIL_BACKEND          = anymail.backends.resend.EmailBackend
RESEND_API_KEY         = <ta clé Resend (à faire tourner)>
# Assistant IA (optionnel) :
OPENROUTER_API_KEY     = <ta clé OpenRouter>
# Admin cree/mis a jour au premier deploiement :
DJANGO_SUPERUSER_USERNAME = admin
DJANGO_SUPERUSER_EMAIL    = ton@email.com
DJANGO_SUPERUSER_PASSWORD = <mdp fort >= 10>
# HTTPS : laisse a False d'abord, passe a True quand tout marche (cf. §5).
SECURE_SSL_REDIRECT    = False
```

### 2.4 Installer & initialiser
Ouvre le **terminal de l'app** (cPanel affiche une commande
`source /home/.../virtualenv/.../activate && cd ...`), puis :
```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py promote_staff        # cree/maj l'admin depuis les env DJANGO_SUPERUSER_*
```
*(Optionnel : `python manage.py loaddata seed.json` pour des données de démo —
à ne PAS remettre à chaque déploiement en vrai prod.)*

### 2.5 Redémarrer
Bouton **Restart** de l'app Python. Teste : `https://api.nourdignagrimarket.com/api/stats/summary/`
doit renvoyer du JSON.

---

## 3. Frontend Next.js (Setup Node.js App)

### 3.1 Envoyer le code
Mets le dépôt frontend (`agri-market-frontend`) dans un dossier, ex. `~/agri-web`.

### 3.2 Créer l'app Node.js
cPanel → **Setup Node.js App** → **Create Application** :
- **Node.js version** : 20 (ou 18).
- **Application root** : `agri-web`.
- **Application URL** : `nourdignagrimarket.com`.
- **Application startup file** : `server.js`.

### 3.3 Variable d'environnement
```
NEXT_PUBLIC_API_URL = https://api.nourdignagrimarket.com
NODE_ENV            = production
```

### 3.4 Installer & builder
Dans le **terminal de l'app Node** (commande `source .../activate` fournie) :
```bash
npm install
npm run build
```
> ⚠️ Le build Next peut être gourmand en RAM. Si l'hébergement mutualisé le
> tue (« Killed »), builde en local (`npm run build`) et **uploade le dossier
> `.next`** avec le code.

### 3.5 Redémarrer
Bouton **Restart**. Visite `https://nourdignagrimarket.com`.

---

## 4. Domaine & sous-domaine

- Le **domaine principal** `nourdignagrimarket.com` doit pointer sur cet
  hébergement n0c (DNS A record vers l'IP du serveur cPanel).
- Créer le **sous-domaine** `api.nourdignagrimarket.com` (cPanel → Domains →
  Subdomains) **avant** de créer l'app Python (l'URL de l'app le sélectionne).

---

## 5. HTTPS

1. cPanel → **SSL/TLS Status** → **Run AutoSSL** pour `nourdignagrimarket.com`,
   `www.` et `api.nourdignagrimarket.com`.
2. Une fois les certificats OK et le site accessible en `https://`, passe la
   variable backend **`SECURE_SSL_REDIRECT = True`** puis **Restart** l'app
   Python (force le HTTPS). *Si tu obtiens une boucle de redirection, remets-la
   à False : Apache ne transmet pas `X-Forwarded-Proto` — dis-le moi.*

---

## 6. Vérifications finales

- [ ] `https://api.nourdignagrimarket.com/api/stats/summary/` → JSON.
- [ ] `https://nourdignagrimarket.com` → le site charge.
- [ ] Connexion au site avec le compte admin → `/dashboard/admin` accessible.
- [ ] Upload d'une image d'annonce → **persiste** après redéploiement (disque n0c).
- [ ] Emails (inscription / reset) reçus.

---

## 7. Points d'attention

- **Secrets** : génère un **nouveau** `SECRET_KEY` et un **nouveau** mot de passe
  DB (les anciens sont exposés dans l'historique git — cf. `SECURITY.md`).
- **Médias** : sur n0c le disque est persistant → plus besoin de Cloudinary
  (mais tu peux le garder via `CLOUDINARY_URL`).
- **Cron** : si tu utilises `django-crontab`, configure les tâches via cPanel →
  **Cron Jobs**.
- **Redéploiement** (mise à jour) : `git pull` (ou ré-upload) → pour le backend
  `pip install -r requirements.txt && migrate && collectstatic` puis Restart ;
  pour le frontend `npm install && npm run build` puis Restart.
- **`api/docs`** : masquées en prod par défaut (mets `EXPOSE_API_DOCS=1` pour
  les réactiver).

---

Prépare la base + les deux apps selon ce guide, et dis-moi à quelle étape tu
bloques (avec le message d'erreur exact) — on débogue ensemble.
