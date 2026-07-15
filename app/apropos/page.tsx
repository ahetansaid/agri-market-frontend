import { StaticPage } from "@/components/layout/static-page";

export const metadata = { title: "À propos" };

export default function AProposPage() {
  return (
    <StaticPage
      title="À propos d'Agri Market Africa"
      subtitle="La marketplace de référence pour l'agriculture africaine — sans commission, sans intermédiaire."
    >
      <p>
        Agri Market Africa met en relation directe producteurs, coopératives et
        acheteurs à travers les 54 pays du continent. Notre mission : donner à
        chaque acteur agricole africain un accès simple, transparent et gratuit
        au marché.
      </p>

      <h2>Notre mission</h2>
      <p>
        Valoriser la production agricole africaine en supprimant les
        intermédiaires superflus. Les vendeurs publient leurs produits, les
        acheteurs les contactent directement — sans commission prélevée sur les
        transactions.
      </p>

      <h2>Nos engagements</h2>
      <ul>
        <li>0 % de commission sur les mises en relation.</li>
        <li>Des annonces vérifiées via une double validation.</li>
        <li>Une couverture panafricaine, multilingue (FR · EN · IT).</li>
        <li>La protection des données de nos utilisateurs.</li>
      </ul>

      <h2>Un projet porté par NourDign / IDA International</h2>
      <p>
        Agri Market Africa est développé par NourDign avec le soutien d&apos;IDA
        International, au service du développement agricole du continent.
      </p>
    </StaticPage>
  );
}
