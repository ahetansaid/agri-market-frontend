import { StaticPage } from "@/components/layout/static-page";

export const metadata = { title: "Politique de confidentialité" };

export default function PrivacyPage() {
  return (
    <StaticPage
      title="Politique de confidentialité"
      subtitle="Comment nous collectons, utilisons et protégeons vos données."
    >
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        Modèle à faire valider juridiquement avant mise en production.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Données de compte : nom, email, téléphone, ville, pays.</li>
        <li>Contenus publiés : annonces, messages.</li>
        <li>Données techniques : logs de connexion, adresse IP.</li>
      </ul>

      <h2>Utilisation</h2>
      <p>
        Vos données servent uniquement au fonctionnement de la plateforme :
        création de compte, mise en relation, messagerie, sécurité et lutte
        contre la fraude. Nous ne vendons jamais vos données.
      </p>

      <h2>Emails</h2>
      <p>
        Nous envoyons des emails transactionnels (vérification de compte,
        notifications) via un prestataire d&apos;envoi. Aucun email marketing
        n&apos;est envoyé sans votre consentement.
      </p>

      <h2>Vos droits</h2>
      <p>
        Vous pouvez accéder à vos données, les rectifier depuis votre profil, ou
        demander leur suppression en écrivant à{" "}
        <a href="mailto:agrimarketafrica@nourdignagrimarket.com">
          agrimarketafrica@nourdignagrimarket.com
        </a>
        .
      </p>

      <h2>Sécurité</h2>
      <p>
        Les mots de passe sont chiffrés, les connexions protégées par HTTPS, et
        l&apos;accès aux comptes limité contre les tentatives d&apos;intrusion.
      </p>
    </StaticPage>
  );
}
