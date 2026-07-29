import { StaticPage } from "@/components/layout/static-page";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "Service client" };

export default async function ServiceClientPage() {
  const { t } = await getT();
  return (
    <StaticPage title={t("svc.title")} subtitle={t("svc.subtitle")}>
      <h2>{t("svc.hChat")}</h2>
      <p>{t("svc.pChat")}</p>

      <h2>{t("svc.hEmail")}</h2>
      <p>
        {t("svc.emailPre")}
        <a href="mailto:agrimarketafrica@nourdignagrimarket.com">
          agrimarketafrica@nourdignagrimarket.com
        </a>
        {t("svc.emailPost")}
      </p>

      <h2>{t("svc.hReport")}</h2>
      <p>{t("svc.pReport")}</p>

      <h2>{t("svc.hSuggest")}</h2>
      <p>{t("svc.pSuggest")}</p>
    </StaticPage>
  );
}
