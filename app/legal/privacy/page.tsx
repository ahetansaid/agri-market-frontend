import { StaticPage } from "@/components/layout/static-page";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "Politique de confidentialité" };

export default async function PrivacyPage() {
  const { t } = await getT();
  return (
    <StaticPage title={t("privacy.title")} subtitle={t("privacy.subtitle")}>
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        {t("legal.draft")}
      </p>

      <h2>{t("privacy.hData")}</h2>
      <ul>
        <li>{t("privacy.dataLi1")}</li>
        <li>{t("privacy.dataLi2")}</li>
        <li>{t("privacy.dataLi3")}</li>
      </ul>

      <h2>{t("privacy.hUse")}</h2>
      <p>{t("privacy.pUse")}</p>

      <h2>{t("privacy.hEmails")}</h2>
      <p>{t("privacy.pEmails")}</p>

      <h2>{t("privacy.hCookies")}</h2>
      <p>{t("privacy.pCookies1")}</p>
      <ul>
        <li>{t("privacy.cookiesEss")}</li>
        <li>{t("privacy.cookiesMeas")}</li>
      </ul>
      <p>{t("privacy.pCookies2")}</p>

      <h2>{t("privacy.hRights")}</h2>
      <p>
        {t("privacy.pRightsPre")}
        <a href="mailto:agrimarketafrica@nourdignagrimarket.com">
          agrimarketafrica@nourdignagrimarket.com
        </a>
        .
      </p>

      <h2>{t("privacy.hSec")}</h2>
      <p>{t("privacy.pSec")}</p>
    </StaticPage>
  );
}
