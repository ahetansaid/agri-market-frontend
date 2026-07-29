import { StaticPage } from "@/components/layout/static-page";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "Conditions d'utilisation" };

export default async function TermsPage() {
  const { t } = await getT();
  return (
    <StaticPage title={t("terms.title")} subtitle={t("terms.subtitle")}>
      <p className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
        {t("legal.draft")}
      </p>

      <h2>{t("terms.h1")}</h2>
      <p>{t("terms.p1")}</p>

      <h2>{t("terms.h2")}</h2>
      <p>{t("terms.p2")}</p>

      <h2>{t("terms.h3")}</h2>
      <ul>
        <li>{t("terms.li1")}</li>
        <li>{t("terms.li2")}</li>
        <li>{t("terms.li3")}</li>
      </ul>

      <h2>{t("terms.h4")}</h2>
      <p>{t("terms.p4")}</p>

      <h2>{t("terms.h5")}</h2>
      <p>{t("terms.p5")}</p>

      <h2>{t("terms.h6")}</h2>
      <p>{t("terms.p6")}</p>
    </StaticPage>
  );
}
