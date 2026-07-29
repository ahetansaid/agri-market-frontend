# Politique de sécurité — Agri Market Africa

Ce document définit les **règles de sécurité strictes** de la plateforme
(frontend Next.js + backend Django + Vercel/Render/Postgres) et consigne les
résultats du dernier audit. Il fait autorité : toute contribution doit s'y
conformer. Toute dérogation doit être justifiée et validée en revue.

Dernier audit : **2026-07-29** (frontend + backend). Audit précédent : 2026-07-04.

---

## 0. Règles d'or (non négociables)

1. **L'API Django est la seule autorité d'autorisation.** Le middleware Next,
   les cookies côté client (`ama_auth`), l'UI : tout cela n'est que du confort.
   Chaque endpoint sensible DOIT vérifier l'authentification ET la propriété de
   l'objet (anti-IDOR) côté serveur.
2. **Aucun secret dans le code ni dans git.** Secrets uniquement via variables
   d'environnement. Jamais de secret dans une variable `NEXT_PUBLIC_*`.
3. **Toute entrée est hostile.** Valider/assainir à l'écriture ET à la lecture.
   Tout HTML utilisateur passe par un sanitiseur (jamais `mark_safe`/`dangerouslySetInnerHTML` sans sanitisation).
4. **Moindre privilège par défaut.** Un endpoint est fermé jusqu'à preuve du
   contraire : `IsAuthenticated`/`IsAdminUser` explicites, jamais de `ModelViewSet`
   en écriture sans permission dédiée.
5. **Défense en profondeur.** Une seule barrière ne suffit pas (ex. sanitiser
   côté front ET côté back ; CSP EN PLUS de l'échappement).

---

## 1. Secrets & configuration

**Règles**
- Secrets (SECRET_KEY, mots de passe DB, clés API Resend/OpenRouter/Cloudinary)
  **exclusivement** via env. `SECRET_KEY` lève une erreur si absente (fait).
- `DEBUG=False` en prod (fait, piloté par env). Jamais de `DEBUG=True` déployé.
- `ALLOWED_HOSTS` restreint aux domaines réels (pas de `*` en prod).
- `.env*` git-ignoré (fait des deux côtés). Seuls `.env.example` (placeholders)
  sont committés.
- Rotation de secret **immédiate** si exposition (commit, log, partage chat).

**⚠️ ACTION OPS EN ATTENTE (critique).** L'ancien fichier `settingsback.py`
(supprimé du disque) contient **dans l'historique git** le `SECRET_KEY` et le
**mot de passe PostgreSQL de prod**. Tant que ce n'est pas traité :
1. changer le mot de passe PostgreSQL (Render),
2. régénérer `SECRET_KEY` (invalide sessions/JWT en cours),
3. purger l'historique (`git filter-repo` / BFG) ou considérer ces secrets
   comme brûlés.

---

## 2. Authentification & session

**Règles**
- Politique mot de passe : ≥ 10 caractères + validateurs Django (fait).
- Anti-brute-force : `django-axes` (5 échecs → lock 1 h) + throttle `auth 10/min`
  et `register 5/min` (fait).
- Flux d'activation / reset : tokens signés expirants ; **le reset ne révèle
  jamais** si un compte existe (fait). **Règle : appliquer le même principe de
  non-énumération à l'inscription** (voir §9, hardening en attente).
- JWT : blacklist + `BLACKLIST_AFTER_ROTATION=True` (fait).
- 2FA obligatoire pour l'admin Django (fait via `AdminSiteOTPRequired`).
  **Hardening en attente** : le flux JWT (`/api/auth/token/`) n'exige pas l'OTP
  pour un compte staff → à durcir si des fonctions d'admin passent par l'API.

**Stockage des tokens (frontend) — hardening prioritaire**
- Aujourd'hui : access + refresh en `localStorage` → volables par XSS.
- **Objectif** : refresh token dans un cookie `HttpOnly; Secure; SameSite=Strict`
  posé par Django. En attendant, la CSP (§5) est la mitigation clé.
- Cookies posés côté client (`ama_auth`, `amk-locale`) : flag `Secure` en HTTPS
  (fait). Ces cookies ne portent aucune valeur d'autorisation.

---

## 3. Autorisation & contrôle d'accès

**Règles**
- Chaque objet accédé par id vérifie la **propriété** (anti-IDOR). Fait sur
  messagerie/conversations/notifications/profil.
- Annonces exposées en lecture seule via l'API (pas d'endpoint update/delete).
- **Écriture des événements réservée aux administrateurs** (`IsAdminUser` sur
  create/update/partial_update/destroy) — **corrigé le 2026-07-29** (auparavant
  tout utilisateur connecté pouvait créer/modifier/**supprimer** un événement).
- Séparation des tâches d'approbation d'annonces (fait à l'audit précédent).

---

## 4. Entrées, XSS & injection

**Règles**
- ORM Django exclusivement ; interdiction de `.raw()`/`.extra()`/SQL brut/`mark_safe`.
- Tout HTML riche (CKEditor : événements, blog) passe par `sanitize_html()`
  (`idamarketplace/security.py`, basé nh3). **Descriptions d'événements
  assainies à la sortie de l'API — corrigé le 2026-07-29.**
- Côté front : `dangerouslySetInnerHTML` **uniquement** via `lib/sanitize.ts`
  (basé `sanitize-html`, whitelist stricte, schémas sûrs, `rel` anti-tabnabbing).
  Les 2 seuls usages (détail annonce, détail événement) respectent la règle.
- Le reste du contenu backend est rendu en **texte JSX échappé**, jamais en HTML.
- Proxy IA (OpenRouter) : clé **côté serveur uniquement**, le LLM n'a aucun
  accès données/outils, la réponse ne retourne qu'à l'appelant.

---

## 5. En-têtes de sécurité & CSP

**Règles (frontend, `next.config.ts` — ajoutés le 2026-07-29)**
- `Content-Security-Policy` : `default-src 'self'`, `object-src 'none'`,
  `frame-ancestors 'none'`, `base-uri 'self'`, `form-action 'self'`, sources
  restreintes (dev assoupli pour le HMR). **Hardening cible : CSP à nonce**
  (retirer `'unsafe-inline'` sur `script-src` via middleware).
- `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy`
  minimale, `Strict-Transport-Security` (prod), `poweredByHeader: false`.

**Backend** : `SECURE_SSL_REDIRECT`, HSTS 1 an + preload, cookies secure,
`SECURE_CONTENT_TYPE_NOSNIFF`, `X_FRAME_OPTIONS=DENY`, referrer-policy (fait).

---

## 6. Rate limiting & anti-abus

**Règles**
- Throttles globaux `anon 120/min` / `user 600/min` (fait).
- Endpoints sensibles : `auth 10/min`, `register 5/min` (fait).
- **Proxy IA : `ai 12/min` par utilisateur — ajouté le 2026-07-29** (anti-abus
  de coût OpenRouter). Envisager un plafond quotidien si un modèle payant est
  utilisé.

---

## 7. Uploads de fichiers

**Règles**
- Validateurs `validate_image_upload` / `validate_document_upload`
  (`idamarketplace/security.py`) : taille + extension + blocklist
  (`.exe`, `.php`, `.svg`, `.html`, `.js`…). Appliqués sur les pièces jointes.
- **Hardening en attente** : appliquer ces validateurs aussi à
  `Announcement.image`, `Utilisateur.picture` et au serializer de création
  d'annonce (aujourd'hui validés seulement via `Pillow`).
- Images servies via Cloudinary en prod (stockage persistant).

---

## 8. CORS / CSRF

**Règles**
- CORS : origines **explicites** via env, jamais de wildcard/regex (fait).
  Retirer les origines `localhost` de la config prod (hardening mineur).
- CSRF : appliqué pour l'auth session ; le front utilise JWT Bearer.
  **Aucune exemption `csrf_exempt`** tolérée.

---

## 9. Exposition de données & durcissements en attente

**Fait** : PII (email/téléphone) non exposée dans les serializers publics ;
non-énumération sur le reset password.

**Hardening en attente (à planifier)**
- **Énumération à l'inscription** : le message « un compte existe déjà »
  révèle les emails enregistrés. Cible : flux non-révélateur (aligné sur le
  reset). *Changement de flux UX + email → à valider avant implémentation.*
- **Docs API** (`/api/docs`, `/api/redoc`, `/api/schema`) : **exposées
  uniquement en dev (ou `EXPOSE_API_DOCS=1`) — corrigé le 2026-07-29.**
- `MeSerializer` : `is_staff` superflu dans la réponse.
- DB `sslmode` : passer de `require` à `verify-full` si le CA le permet.
- Refresh token → cookie HttpOnly (voir §2).
- CSP à nonce (voir §5).

---

## 10. Dépendances & CI

**Règles**
- Épingler les versions ; suivre les patchs de sécurité (Django 5.2.x à jour).
- **CI obligatoire** : `npm audit` (front) + `pip-audit`/`safety` (back) en
  échec bloquant sur vulnérabilité haute/critique.
- Séparer `requirements` dev/prod (retirer black/mypy/pytest/flower… de la prod).
- **⚠️ `django-ckeditor` embarque CKEditor 4.22.1** (avertissement `ckeditor.W001`),
  version aux **failles XSS non corrigées**. Cible : migrer entièrement vers
  `django-ckeditor-5`. En attendant, tout HTML produit par CKEditor 4 DOIT
  être assaini via `sanitize_html()` au rendu (API et templates Django).

---

## 11. Processus

- **Revue de sécurité** sur toute PR touchant : auth, permissions, endpoints,
  rendu HTML, uploads, config/déploiement, dépendances.
- **Ne jamais** committer/afficher un secret ; en cas de fuite → rotation immédiate.
- Rejouer cet audit à chaque évolution majeure (nouveaux endpoints, nouveau
  fournisseur, refonte auth).

---

## Annexe — Statut des constats du 2026-07-29

| # | Constat | Sévérité | Statut |
|---|---------|----------|--------|
| B1 | API Événements : écriture ouverte à tout utilisateur connecté | Élevée | ✅ Corrigé (IsAdminUser) |
| B2 | `sanitize_html()` défini mais jamais branché (descriptions événements) | Élevée | ✅ Corrigé (assaini en sortie API) |
| B3 | Proxy IA sans throttle dédié (abus de coût) | Moyenne | ✅ Corrigé (`ai 12/min`) |
| B4 | Docs API exposées publiquement en prod | Faible | ✅ Corrigé (dev/opt-in only) |
| B5 | Énumération d'utilisateurs à l'inscription | Moyenne | ⏳ En attente (change le flux UX) |
| B6 | 2FA staff contournable via flux JWT | Moyenne | ⏳ En attente |
| B7 | Validateurs d'upload absents sur image annonce/profil | Faible | ⏳ En attente |
| B8 | Origines CORS `localhost` en prod ; DB `sslmode=require` | Faible | ⏳ Mineur |
| B9 | `django-ckeditor` = CKEditor 4.22.1 (XSS non corrigées) | Moyenne | ⏳ Migrer vers CKEditor 5 ; sanitiser en attendant |
| F1 | Aucun en-tête de sécurité (CSP, HSTS, X-Frame-Options…) | Élevée | ✅ Corrigé |
| F2 | Tokens (access+refresh) en `localStorage` | Élevée | ⏳ En attente (refonte auth) |
| F3 | Open redirect via `?next=` au login | Moyenne | ✅ Corrigé |
| F4 | Cookies clients sans flag `Secure` | Faible | ✅ Corrigé |
| OPS | SECRET_KEY + mot de passe DB dans l'historique git | Critique | ⏳ **Action ops requise** |
