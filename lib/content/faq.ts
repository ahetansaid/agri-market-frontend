// Contenu de la FAQ (FR) — repris de l'ancienne plateforme.
// Les pages EN/IT retombent sur le FR tant que la traduction n'est pas faite.
// Email de contact harmonisé sur agrimarketafrica@nourdignagrimarket.com.

export const FAQ_EMAIL = "agrimarketafrica@nourdignagrimarket.com";

export type FaqItem = { q: string; a: string };
export type FaqCategory = { id: string; label: string; items: FaqItem[] };

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "demarrage",
    label: "Démarrage",
    items: [
      {
        q: "Comment créer un compte ?",
        a: "Cliquez sur « S'inscrire » en haut à droite. Vous choisissez votre type de compte (Individu ou Entreprise), remplissez vos identifiants (nom d'utilisateur, email, mot de passe) puis vos coordonnées (téléphone, pays). Un email d'activation vous est envoyé immédiatement.",
      },
      {
        q: "Je n'ai pas reçu l'email d'activation. Que faire ?",
        a: "Vérifiez d'abord votre dossier spam / courriers indésirables. Si rien : assurez-vous que l'adresse renseignée est correcte. Vous pouvez vous réinscrire avec la bonne adresse, l'ancien compte non activé sera nettoyé.",
      },
      {
        q: "Individu ou Entreprise : que choisir ?",
        a: "Choisissez Individu si vous êtes un producteur indépendant, un acheteur particulier ou un revendeur en nom propre. Choisissez Entreprise si vous représentez une société, une coopérative, une PME ou une organisation. Vous pourrez compléter le profil entreprise (NIF, RCCM, secteur) depuis votre profil après inscription.",
      },
      {
        q: "Je n'arrive pas à me connecter.",
        a: "Vérifiez d'abord que votre compte est bien activé (email confirmé). Si vous avez oublié votre mot de passe, utilisez « Mot de passe oublié » sur la page de connexion. Après 5 tentatives infructueuses, votre compte est verrouillé 1h pour des raisons de sécurité.",
      },
    ],
  },
  {
    id: "annonces",
    label: "Annonces",
    items: [
      {
        q: "Comment publier une annonce ?",
        a: "Cliquez sur « + Publier » dans le header (vous devez être connecté). Choisissez le type (Vente / Achat / Autre), remplissez le titre, la catégorie, le pays, la description et les caractéristiques. Ajoutez une photo (max 500 Ko, JPG ou PNG). Soumettez : votre annonce passe en validation par notre équipe (24h en moyenne).",
      },
      {
        q: "Mon annonce a été rejetée. Pourquoi ?",
        a: "Le motif du rejet apparaît dans votre dashboard sous « Mes annonces » → onglet « Rejetées ». Les raisons fréquentes : coordonnées personnelles dans la description, photo manquante ou inadéquate, informations contradictoires, contenu inapproprié. Corrigez puis cliquez sur « Resoumettre ».",
      },
      {
        q: "Pourquoi je ne peux pas mettre mon numéro de téléphone ?",
        a: "Aucune coordonnée personnelle (téléphone, email, site web, adresse, réseaux sociaux) n'est autorisée dans la description ou les caractéristiques. C'est pour protéger les producteurs contre le spam, le démarchage abusif et les arnaques. Les acheteurs intéressés vous contactent via notre messagerie interne sécurisée. Notre système vérifie automatiquement et bloque la publication si une coordonnée est détectée.",
      },
      {
        q: "Combien de temps reste une annonce en ligne ?",
        a: "Une annonce reste publiée tant que vous ne l'archivez pas. Si la transaction est conclue ou que le produit n'est plus disponible, archivez-la depuis « Mes annonces ». Vous pouvez aussi la rééditer pour la mettre à jour (quantité, prix, etc.).",
      },
      {
        q: "Quelle photo mettre pour mon annonce ?",
        a: "Une photo réelle de votre produit. Format JPG ou PNG, 500 Ko max, idéalement 740 × 380 px. Évitez les photos trouvées sur internet — les acheteurs préfèrent voir le vrai produit. Une bonne lumière naturelle, un fond neutre et un cadrage net augmentent les chances de contact.",
      },
    ],
  },
  {
    id: "messagerie",
    label: "Échanges & messagerie",
    items: [
      {
        q: "Comment contacter un vendeur ?",
        a: "Sur la page de l'annonce, cliquez sur « Contacter le vendeur ». Vous devez être connecté. Une conversation privée s'ouvre — saisissez votre message et envoyez. Le vendeur reçoit une notification email et peut vous répondre directement depuis la plateforme.",
      },
      {
        q: "Mes messages sont-ils privés ?",
        a: "Oui. Seuls vous et votre interlocuteur voyez les messages. Aucun autre utilisateur n'y a accès. Notre équipe peut consulter les conversations uniquement en cas de signalement (escroquerie, spam) pour intervenir.",
      },
      {
        q: "Puis-je envoyer une pièce jointe ?",
        a: "Oui — un document (PDF, DOCX, XLSX...) ou une image (JPG, PNG, WebP). Taille max : 10 Mo pour les documents, 5 Mo pour les images. Les types de fichiers exécutables (.exe, .sh, .js, etc.) sont automatiquement bloqués.",
      },
      {
        q: "Comment supprimer une conversation ?",
        a: "Dans votre messagerie, ouvrez la conversation et cliquez sur l'icône archiver (corbeille). Elle passe dans « Corbeille ». Vous pouvez la restaurer ensuite si besoin. Note : la conversation reste visible chez votre interlocuteur tant qu'il ne l'archive pas de son côté.",
      },
    ],
  },
  {
    id: "securite",
    label: "Paiement & sécurité",
    items: [
      {
        q: "Est-ce que la plateforme prend une commission ?",
        a: "Non. Agri Market Africa est entièrement gratuit : publier, contacter, conclure — aucune commission, aucun frais. Notre modèle économique repose sur des partenariats et services à valeur ajoutée à venir (certification, financement, données), jamais sur des frais cachés.",
      },
      {
        q: "Comment se fait le paiement entre acheteur et vendeur ?",
        a: "Les paiements ne transitent PAS par la plateforme. Vous convenez directement avec votre interlocuteur des modalités (virement, mobile money, espèces à la livraison, etc.) via la messagerie. Notre rôle s'arrête à la mise en relation — vous restez maître des conditions commerciales.",
      },
      {
        q: "Comment éviter les arnaques ?",
        a: "Quelques règles simples :\n• Ne payez JAMAIS avant d'avoir vérifié le produit (si possible en personne)\n• Méfiez-vous des prix trop bas par rapport au marché\n• Vérifiez l'ancienneté du compte vendeur\n• Préférez le paiement à la livraison pour les premières transactions\n• Signalez tout comportement suspect à agrimarketafrica@nourdignagrimarket.com",
      },
      {
        q: "Que signifie le badge « Bio » sur une annonce ?",
        a: "Le badge « Bio » indique que le vendeur déclare son produit issu d'agriculture biologique. Pour le moment, c'est une déclaration : nous travaillons à mettre en place une certification « NourDign » vérifiée par notre équipe pour fiabiliser cette information à terme.",
      },
    ],
  },
  {
    id: "compte",
    label: "Compte & profil",
    items: [
      {
        q: "Comment modifier mon profil ?",
        a: "Cliquez sur votre avatar en haut à droite → « Mon profil ». Vous pouvez mettre à jour vos coordonnées, votre photo, votre adresse. Les informations entreprise (NIF, RCCM, secteur) sont également modifiables si vous avez un compte société.",
      },
      {
        q: "Comment changer mon mot de passe ?",
        a: "Avatar → « Mot de passe » depuis votre profil. Vous devez saisir votre mot de passe actuel + le nouveau (deux fois). Minimum 10 caractères, évitez les mots de passe communs.",
      },
      {
        q: "Qu'est-ce que l'authentification à deux facteurs (2FA) ?",
        a: "Une couche de sécurité supplémentaire : en plus de votre mot de passe, vous devez saisir un code à 6 chiffres généré par une application sur votre téléphone (Authy, Google Authenticator, Bitwarden). Recommandé pour les comptes admin et coopératives. Activable depuis votre profil → Sécurité.",
      },
      {
        q: "Puis-je supprimer mon compte ?",
        a: "Oui — envoyez une demande à agrimarketafrica@nourdignagrimarket.com depuis l'adresse email de votre compte. Vos annonces et messages seront anonymisés ou supprimés. Cette opération est irréversible.",
      },
    ],
  },
  {
    id: "technique",
    label: "Technique & multilingue",
    items: [
      {
        q: "Quelles langues sont supportées ?",
        a: "Trois langues : Français (par défaut), Anglais, Italien. Changez la langue via le sélecteur en haut à droite du header. Le contenu (annonces, descriptions) est affiché dans la langue saisie par le vendeur.",
      },
      {
        q: "Existe-t-il une application mobile ?",
        a: "Pas encore d'app dédiée. Le site est entièrement responsive : il s'adapte automatiquement à votre smartphone. Vous pouvez l'ajouter à votre écran d'accueil pour un accès rapide.",
      },
      {
        q: "J'ai trouvé un bug — où le signaler ?",
        a: "Envoyez un email à agrimarketafrica@nourdignagrimarket.com avec si possible une capture d'écran, l'URL de la page, et la description du problème (navigateur, smartphone, etc.). Nous répondons sous 48h.",
      },
    ],
  },
];
