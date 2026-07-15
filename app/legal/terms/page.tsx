import { StaticPage } from "@/components/layout/static-page";

export const metadata = { title: "Conditions d'utilisation" };

export default function TermsPage() {
  return (
    <StaticPage
      title="Conditions générales d'utilisation"
      subtitle="Les règles d'utilisation de la plateforme Agri Market Africa."
    >
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        Modèle à faire valider juridiquement avant mise en production.
      </p>

      <h2>1. Objet</h2>
      <p>
        Agri Market Africa est une plateforme de petites annonces mettant en
        relation vendeurs et acheteurs de produits agricoles. L&apos;inscription
        et la publication sont gratuites.
      </p>

      <h2>2. Compte utilisateur</h2>
      <p>
        Vous vous engagez à fournir des informations exactes et à garder vos
        identifiants confidentiels. Un compte doit être activé par email avant
        toute connexion.
      </p>

      <h2>3. Publication d&apos;annonces</h2>
      <ul>
        <li>Les annonces doivent être licites, exactes et non trompeuses.</li>
        <li>
          Elles peuvent être soumises à validation avant mise en ligne.
        </li>
        <li>
          Tout contenu frauduleux ou illégal entraîne la suspension du compte.
        </li>
      </ul>

      <h2>4. Transactions</h2>
      <p>
        Les transactions se concluent directement entre utilisateurs. Agri
        Market Africa ne perçoit aucune commission et n&apos;est pas partie au
        contrat de vente.
      </p>

      <h2>5. Responsabilité</h2>
      <p>
        La plateforme ne garantit pas la bonne exécution des transactions entre
        utilisateurs. Restez vigilant et signalez tout comportement suspect.
      </p>

      <h2>6. Modification</h2>
      <p>
        Ces conditions peuvent évoluer. Les utilisateurs sont informés des
        changements substantiels.
      </p>
    </StaticPage>
  );
}
