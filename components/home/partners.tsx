import Image from "next/image";
import { getT } from "@/lib/i18n/server";
import { IDA } from "@/lib/content/ida";

/** Bande « Nos partenaires » — logos réels repris du CMS (couleurs d'origine). */
export async function Partners() {
  const { t } = await getT();
  return (
    <section className="border-t border-border/60 bg-sand-50">
      <div className="mx-auto max-w-6xl px-4 py-14 text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
          {t("evt.partnersEyebrow")}
        </span>
        <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {t("evt.partners1")}{" "}
          <em className="italic font-normal bg-gradient-to-br from-harvest-500 to-harvest-700 bg-clip-text text-transparent">
            {t("evt.partners2")}
          </em>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-muted-foreground">
          {t("evt.partnersDesc")}
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {IDA.partners.map((p) => (
            <div
              key={p.name}
              title={p.name}
              className="grid h-20 w-32 place-items-center rounded-2xl border border-border bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:h-24 sm:w-40"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={140}
                height={72}
                className="h-full w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
