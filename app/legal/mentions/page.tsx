import { StaticPage } from "@/components/layout/static-page";

export const metadata = { title: "Mentions légales" };

export default function MentionsPage() {
  return (
    <StaticPage
      title="Mentions légales"
      subtitle="Informations légales relatives au site Agri Market Africa."
    >
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        Modèle à compléter avec vos informations légales définitives (raison
        sociale, immatriculation, hébergeur) avant mise en production.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Agri Market Africa est édité par NourDign / IDA International.
        Contact :{" "}
        <a href="mailto:agrimarketafrica@nourdignagrimarket.com">
          agrimarketafrica@nourdignagrimarket.com
        </a>
        .
      </p>

      <h2>Hébergement</h2>
      <p>
        Le site est hébergé par Vercel Inc. (frontend) et Render Inc. (backend).
        Les données sont stockées sur une base PostgreSQL managée.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des éléments du site (marque, logo, contenus, code) est
        protégé. Toute reproduction sans autorisation est interdite.
      </p>

      <h2>Responsabilité</h2>
      <p>
        Agri Market Africa met en relation vendeurs et acheteurs mais
        n&apos;intervient pas dans les transactions. La responsabilité de la
        plateforme ne saurait être engagée pour les échanges conclus entre
        utilisateurs.
      </p>
    </StaticPage>
  );
}
