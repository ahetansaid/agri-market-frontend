# Refonte « Évian Teal » — Blueprint marketplace

Direction validée : pivot vers une identité **institutionnelle épurée** inspirée du site de la Ville d'Évian (teal profond, cartes plates, rails d'accès rapide, forte lisibilité/accessibilité). On remplace l'identité « African Terra » (orange + serif Fraunces) par un système teal moderne, tout en gardant un accent chaud (gold/lime) pour l'âme agricole.

Génération des composants : pilotée via le **MCP 21st.dev** (à activer en rechargeant Claude Code).

---

## 1. Design system

### Palette (à mettre dans `app/globals.css` via `@theme`)

```css
/* Teal — couleur de marque (remplace brand orange) */
--color-brand-50:  #f0f9f9;
--color-brand-100: #d7eeee;
--color-brand-200: #aaddde;
--color-brand-300: #74c3c4;
--color-brand-400: #45a3a5;
--color-brand-500: #2a8688;   /* teal vif */
--color-brand-600: #1d6e70;   /* teal principal (headers, CTA) */
--color-brand-700: #175a5c;   /* teal profond (à la Évian) */
--color-brand-800: #124749;
--color-brand-900: #0d3536;

/* Accents chaleureux (dots décoratifs, badges) */
--color-gold:   #e3a63c;   /* orange doux Évian (CTA secondaire) */
--color-lime:   #c3d24b;   /* jaune-vert des pastilles déco */

/* Neutres — fond clair légèrement teinté */
--color-sand-50:  #f6faf9;
--color-sand-100: #eef3f2;
--color-sand-200: #dfe7e6;
--color-sand-300: #c3d0cf;
--color-sand-900: #10201f;   /* texte/fond sombre teinté teal */
```

- **CTA primaire** : teal-600 → teal-700 (dégradé léger), texte blanc, coins arrondis (`rounded-full`).
- **CTA secondaire / highlights** : gold.
- **Pastilles décoratives** de titre de section : trio de points gold/lime/teal (motif Évian « ✿ »).

### Typographie
- Retirer **Fraunces** (serif éditorial African Terra).
- Titres : sans moderne élégant, light/regular, grand corps (garder **Inter** ou passer à *Figtree*/*Instrument Sans*).
- **Eyebrows** de section : petites capitales, `tracking-[0.2em]`, teal-600.
- Titres de section centrés, poids léger, avec pastilles déco au-dessus.

### Principes UI (repris d'Évian)
- Cartes **plates**, coins arrondis moyens, ombres très douces (pas de gros glow).
- Beaucoup de blanc, sections aérées, séparateurs fins.
- Barre d'accès rapide en **rail horizontal** d'icônes teal.
- Accessibilité mise en avant (widget préférences).

---

## 2. Mapping des sections : Évian → Marketplace

| Bloc Évian | Équivalent marketplace | Source données |
|---|---|---|
| Header (logo, réseaux, recherche, météo, menu) | Header refondu + recherche + sélecteur langue + météo/dev optionnel | — |
| Hero carrousel (bannière + CTA + dots) | Hero carrousel : produits de saison / promotions / événement phare | statique + `/api/announcements` |
| Rail d'accès rapide (cartes icônes) | Rail actions : Toutes les annonces · Filières · Publier · Producteurs · Carte des pays · Événements · Mon compte | routes existantes |
| Actualités (grille 4 cartes) | Dernières annonces **ou** Actus + une grille d'annonces vedettes | `/api/announcements?sort=recent` |
| Exposition + Agenda (2 colonnes) | **Producteur du mois** (vedette) + **Événements & salons** (agenda) | `/api/producer-of-month/`, `/api/evenements/` |
| Nos Publications (bande sombre, carrousel) | Guides & publications / Newsletter / magazine PDF | statique |
| Bandeau logos partenaires | Partenaires / labels | statique |
| Footer teal (réseaux, colonnes, vagues) | Footer refondu teal | — |
| Widget accessibilité (Lisio) | Widget préférences (contraste, taille texte, langue) | client |

> La **carte d'Afrique interactive** (`africa-map.tsx`) et les sections producteur/événements existent déjà — on les **restyle** en teal, on ne les réécrit pas de zéro.

---

## 3. Ordre de construction (avec 21st.dev)

Une fois 21st actif, je génère puis j'intègre dans cet ordre :

1. **Tokens** — réécrire la palette/typo dans `globals.css` (base commune, à faire en premier).
2. **Header** teal (barre utilitaire + nav + recherche + langue + widget).
3. **Hero carrousel** full-bleed avec overlay + CTA + dots (client, autoplay léger).
4. **Rail d'accès rapide** (cartes icônes teal, scroll horizontal + flèches).
5. **Section header** réutilisable (eyebrow + pastilles + titre centré).
6. **Carte d'annonce** restylée teal (remplace le look orange actuel).
7. **Grille « Dernières annonces »** (réutilise la carte).
8. **Bloc 2 colonnes** Producteur du mois + Agenda événements.
9. **Bande Publications** (fond teal sombre, carrousel).
10. **Bandeau partenaires** + **Footer** teal.
11. **Widget préférences/accessibilité** flottant.
12. **Page listing `/annonces`** restylée (filtres + grille) et **détail** en teal.

Chaque composant : généré via 21st → adapté aux données réelles de `lib/api.ts` → vérifié (`tsc` + rendu 200).

---

## 4. Ce qu'il reste à faire côté utilisateur

1. **Recharger Claude Code** (`Ctrl+Shift+P` → *Developer: Reload Window*) pour charger le MCP 21st.
2. **Approuver** le serveur `21st` quand Claude Code le demande.
3. Me dire **« go »** : je lance l'étape 1 (tokens) puis j'enchaîne les composants.

Config MCP : `.mcp.json` (déjà créé, **gitignored** pour protéger la clé API).
