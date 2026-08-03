import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GuideView } from "@/components/guide/guide-view";

export const metadata = {
  title: "Guide utilisateur — Comment ça marche",
  description:
    "Guide pas-à-pas : s'inscrire, publier une annonce, échanger avec un acheteur et conclure une transaction sereinement.",
};

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-sand-50">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/60 bg-gradient-to-b from-white to-sand-50">
          <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-brand-500 opacity-10 blur-[110px]" />
          <div className="pointer-events-none absolute -right-24 top-0 h-72 w-72 rounded-full bg-harvest-500 opacity-10 blur-[110px]" />
          <div className="relative mx-auto max-w-3xl px-4 py-14 text-center sm:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-widest text-harvest-700 shadow-sm ring-1 ring-border">
              Guide utilisateur
            </span>
            <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-5xl">
              Tirez le meilleur de{" "}
              <em className="font-normal italic bg-gradient-to-br from-brand-600 to-harvest-600 bg-clip-text text-transparent">
                la plateforme.
              </em>
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground">
              Un guide simple, étape par étape, pour s'inscrire, publier une
              annonce, échanger avec un acheteur et conclure une transaction
              sereinement.
            </p>
          </div>
        </section>

        <GuideView />
      </main>
      <Footer />
    </>
  );
}
