import { StaticPage } from "@/components/layout/static-page";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "Mentions légales" };

export default async function MentionsPage() {
  const { t } = await getT();
  return (
    <StaticPage title={t("mentions.title")} subtitle={t("mentions.subtitle")}>
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        {t("mentions.draft")}
      </p>

      <h2>{t("mentions.hEditor")}</h2>
      <p>
        {t("mentions.editorPre")}
        <a href="mailto:agrimarketafrica@nourdignagrimarket.com">
          agrimarketafrica@nourdignagrimarket.com
        </a>
        .
      </p>

      <h2>{t("mentions.hHost")}</h2>
      <p>{t("mentions.pHost")}</p>

      <h2>{t("mentions.hIp")}</h2>
      <p>{t("mentions.pIp")}</p>

      <h2>{t("mentions.hResp")}</h2>
      <p>{t("mentions.pResp")}</p>
    </StaticPage>
  );
}
