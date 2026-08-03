// Contenu du guide utilisateur (FR) — repris de l'ancienne plateforme.
// Les pages EN/IT retombent sur le FR tant que la traduction n'est pas faite.

export type GuideStep = { t: string; d: string };
export type GuideSection = {
  n: string;
  id: string;
  title: string;
  intro: string;
  steps: GuideStep[];
  tip?: { t: string; d: string };
};

export const GUIDE_SECTIONS: GuideSection[] = [
  {
    n: "01",
    id: "compte",
    title: "Créer votre compte",
    intro:
      "L'inscription prend moins de 3 minutes et reste gratuite. Aucune carte bancaire requise.",
    steps: [
      {
        t: "Cliquez sur « S'inscrire »",
        d: "En haut à droite du site, le bouton vert ouvre le formulaire d'inscription.",
      },
      {
        t: "Choisissez le type de compte",
        d: "Individu si vous êtes producteur indépendant, acheteur particulier, ou revendeur en nom propre. Entreprise pour les sociétés, coopératives, PME et organisations.",
      },
      {
        t: "Remplissez vos identifiants",
        d: "Nom d'utilisateur (sera visible publiquement), adresse email valide, mot de passe robuste (10 caractères minimum, évitez les mots courants).",
      },
      {
        t: "Saisissez vos coordonnées",
        d: "Pays (obligatoire), ville, téléphone — ces données restent privées, jamais affichées sur les annonces.",
      },
      {
        t: "Validez votre email",
        d: "Un email d'activation est envoyé immédiatement. Cliquez sur le lien dedans pour finaliser l'inscription. Pensez à vérifier les spams si rien n'arrive.",
      },
    ],
    tip: {
      t: "Astuce",
      d: "Utilisez votre email professionnel si vous représentez une entreprise — ça renforce la crédibilité auprès des acheteurs.",
    },
  },
  {
    n: "02",
    id: "publier",
    title: "Publier votre première annonce",
    intro:
      "Mettre en ligne une offre de vente, de recherche ou de service prend 5 minutes.",
    steps: [
      {
        t: "Cliquez sur « + Publier »",
        d: "Dans le header (visible une fois connecté). Vous arrivez sur le formulaire de création d'annonce.",
      },
      {
        t: "Choisissez le type",
        d: "Vente (je propose un produit), Achat (je cherche un produit), Autre (service, partenariat, information). Le formulaire s'adapte automatiquement.",
      },
      {
        t: "Rédigez un titre accrocheur",
        d: "Soyez précis : « 500 kg de mil bio Souna 3 — récolte 2026 » est meilleur que « Mil à vendre ».",
      },
      {
        t: "Sélectionnez la catégorie et la sous-filière",
        d: "Plus c'est précis, plus les bons acheteurs trouvent votre annonce.",
      },
      {
        t: "Ajoutez une photo",
        d: "JPG ou PNG, 500 Ko max, idéalement 740 × 380 px. Une photo réelle du produit (pas une image trouvée sur Internet) inspire confiance.",
      },
      {
        t: "Décrivez le produit",
        d: "Variété, origine, conditions de stockage, certifications éventuelles. ATTENTION : aucune coordonnée personnelle (téléphone, email, site, adresse) — notre système refuse automatiquement l'annonce sinon.",
      },
      {
        t: "Précisez la quantité et l'unité",
        d: "Pour les annonces de vente / achat, la quantité et l'unité (kg, sacs, litres, tonnes...) sont obligatoires.",
      },
      {
        t: "Soumettez pour validation",
        d: "Votre annonce part en relecture par notre équipe. Délai moyen : 24h. Vous recevez un email à l'approbation (ou avec le motif si elle est rejetée).",
      },
    ],
    tip: {
      t: "Optimisez votre annonce",
      d: "Les annonces avec photo + description détaillée (variété, origine, conditions) + caractéristiques techniques reçoivent 5× plus de contacts.",
    },
  },
  {
    n: "03",
    id: "trouver",
    title: "Trouver des annonces qui vous intéressent",
    intro:
      "Plusieurs façons de parcourir le marché — choisissez celle qui vous va le mieux.",
    steps: [
      {
        t: "Par filière",
        d: "Mégamenu « Catégories » dans le header : céréales, élevage, fruits, maraîchage, pêche, transformation, équipement...",
      },
      {
        t: "Par pays",
        d: "Menu « Pays » : trouvez les annonces du Bénin, Sénégal, Côte d'Ivoire, Kenya, Maroc... les 54 pays africains sont couverts.",
      },
      {
        t: "Par mot-clé",
        d: "Icône loupe en haut. Tapez un mot-clé (tomate, riz, bovin...) ou une référence (REF-1234). Filtrable par type vente/achat.",
      },
      {
        t: "Filtres avancés",
        d: "Sur les pages listing : filtrez par type, pays, sous-filière. Triez par date ou nom.",
      },
    ],
  },
  {
    n: "04",
    id: "contacter",
    title: "Contacter un vendeur",
    intro:
      "Toute communication passe par notre messagerie interne — sécurisée et privée.",
    steps: [
      {
        t: "Ouvrez l'annonce qui vous intéresse",
        d: "Cliquez dessus depuis la liste ou la page d'accueil.",
      },
      {
        t: "Cliquez sur « Contacter le vendeur »",
        d: "Bouton vert dans la colonne droite. Si vous n'êtes pas connecté, on vous demande de vous inscrire (gratuit) ou vous connecter.",
      },
      {
        t: "Rédigez votre message",
        d: "Soyez précis : volume souhaité, lieu de livraison, délai. Plus c'est clair, plus la réponse est rapide.",
      },
      {
        t: "Envoyez et attendez",
        d: "Le vendeur reçoit une notification email et peut répondre depuis son compte. Vous retrouvez toutes vos conversations dans « Messages → Reçus / Envoyés ».",
      },
    ],
    tip: {
      t: "Important",
      d: "Ne mettez JAMAIS vos coordonnées personnelles (téléphone, email, adresse) dans les premiers messages. Apprenez à connaître votre interlocuteur d'abord. Ne payez jamais avant d'avoir vérifié le produit.",
    },
  },
  {
    n: "05",
    id: "vendre",
    title: "Bonnes pratiques pour vendre",
    intro: "Les conseils de l'équipe pour augmenter vos chances de conclure.",
    steps: [
      {
        t: "Une vraie photo, lumineuse",
        d: "Prenez la photo en extérieur, fond neutre, sous lumière naturelle. Pas de filtre. La transparence inspire confiance.",
      },
      {
        t: "Description précise",
        d: "Variété, origine géographique, méthode de culture, certifications, conditions de stockage. Plus de détails = moins de questions = vente plus rapide.",
      },
      {
        t: "Réponse rapide",
        d: "Répondre dans les 24h à un message multiplie par 4 vos chances de conclure. Activez les notifications email.",
      },
      {
        t: "Mots-clés pertinents",
        d: "Ajoutez 3-5 tags : nom du produit, variété, région, label bio s'il y a lieu. Aide les acheteurs à vous trouver.",
      },
      {
        t: "Tenez l'annonce à jour",
        d: "Mettez à jour la quantité disponible. Archivez quand c'est vendu. Une annonce active et fraîche remonte mieux.",
      },
      {
        t: "Soyez professionnel",
        d: "Politesse, ponctuation, signature avec votre prénom + nom d'entreprise. Pas d'écriture SMS. Vous construisez une relation commerciale.",
      },
    ],
  },
  {
    n: "06",
    id: "securite",
    title: "Sécurité & confidentialité",
    intro:
      "Vos données et vos transactions sont protégées par plusieurs niveaux de mesures.",
    steps: [
      {
        t: "Validation manuelle des annonces",
        d: "Chaque annonce est relue par notre équipe avant publication. Pas de spam, pas de produit fantôme, pas d'arnaque facile.",
      },
      {
        t: "Coordonnées privées",
        d: "Téléphone, email, adresse — jamais affichés sur les annonces. Le seul canal de contact est la messagerie interne.",
      },
      {
        t: "Mots de passe robustes",
        d: "Min. 10 caractères, mots courants refusés. Verrouillage après 5 tentatives échouées. 2FA optionnelle pour les comptes sensibles.",
      },
      {
        t: "Anti-spam intégré",
        d: "Les coordonnées personnelles dans les annonces sont automatiquement détectées et bloquent la soumission. Récidive = suspension.",
      },
      {
        t: "Activez la 2FA",
        d: "Profil → Sécurité → « Configurer la 2FA ». Vous ajouterez ainsi un code à 6 chiffres à votre login, généré par votre app authenticator. Indispensable pour les comptes coopérative et entreprise.",
      },
    ],
  },
];
