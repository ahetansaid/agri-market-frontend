import { StaticPage } from "@/components/layout/static-page";
import { getT } from "@/lib/i18n/server";

export const metadata = { title: "À propos" };

export default async function AProposPage() {
  const { t } = await getT();
  return (
    <StaticPage title={t("apropos.title")} subtitle={t("apropos.subtitle")}>
      <p>{t("apropos.p1")}</p>

      <h2>{t("apropos.hMission")}</h2>
      <p>{t("apropos.pMission")}</p>

      <h2>{t("apropos.hCommit")}</h2>
      <ul>
        <li>{t("apropos.li1")}</li>
        <li>{t("apropos.li2")}</li>
        <li>{t("apropos.li3")}</li>
        <li>{t("apropos.li4")}</li>
      </ul>

      <h2>{t("apropos.hProject")}</h2>
      <p>{t("apropos.pProject")}</p>
    </StaticPage>
  );
}
