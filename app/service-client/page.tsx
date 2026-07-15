import { StaticPage } from "@/components/layout/static-page";

export const metadata = { title: "Service client" };

export default function ServiceClientPage() {
  return (
    <StaticPage
      title="Service client"
      subtitle="Une question, un problème, une suggestion ? Nous sommes là pour vous aider."
    >
      <h2>Le chat en direct</h2>
      <p>
        Le moyen le plus rapide : cliquez sur la bulle{" "}
        <strong>« Assistance »</strong> en bas à droite de l&apos;écran pour
        discuter avec notre équipe. Connectez-vous pour conserver l&apos;historique
        de vos échanges.
      </p>

      <h2>Par email</h2>
      <p>
        Écrivez-nous à{" "}
        <a href="mailto:agrimarketafrica@nourdignagrimarket.com">
          agrimarketafrica@nourdignagrimarket.com
        </a>
        . Nous répondons généralement sous 24 h ouvrées.
      </p>

      <h2>Signaler un désagrément ou une arnaque</h2>
      <p>
        Si une annonce ou un utilisateur vous semble suspect, contactez-nous
        immédiatement via le chat ou par email en précisant la référence de
        l&apos;annonce. Notre équipe intervient rapidement pour protéger la
        communauté.
      </p>

      <h2>Suggestions</h2>
      <p>
        Vos retours nous aident à améliorer la plateforme. N&apos;hésitez pas à
        nous partager vos idées.
      </p>
    </StaticPage>
  );
}
