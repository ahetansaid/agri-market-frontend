"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2, XCircle, ArrowRight } from "lucide-react";
import { activateAccount } from "@/lib/auth";

export default function ActivatePage() {
  const params = useParams<{ uid: string; token: string }>();
  const [state, setState] = useState<"loading" | "ok" | "error">("loading");
  const [msg, setMsg] = useState("Activation de votre compte…");

  useEffect(() => {
    const uid = params?.uid as string | undefined;
    const token = params?.token as string | undefined;
    if (!uid || !token) {
      setState("error");
      setMsg("Lien d'activation invalide.");
      return;
    }
    activateAccount(uid, token)
      .then((r) => {
        setState("ok");
        setMsg(r.detail);
      })
      .catch((e) => {
        setState("error");
        setMsg(e instanceof Error ? e.message : "Activation impossible.");
      });
  }, [params]);

  return (
    <main className="grid min-h-screen place-items-center bg-sand-50 px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
        <Link href="/" className="mx-auto mb-6 flex w-fit items-center gap-2.5">
          <div className="h-11 w-11 rounded-xl bg-white p-1 ring-1 ring-brand-100">
            <Image
              src="/logo.png"
              alt="Agri Market Africa"
              width={36}
              height={36}
              className="h-full w-full object-contain"
            />
          </div>
          <span className="font-display text-lg font-bold text-harvest-700">
            Agri <span className="text-brand-600">Market</span> Africa
          </span>
        </Link>

        {state === "loading" && (
          <div className="grid place-items-center gap-4 py-6 text-muted-foreground">
            <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
            <p className="text-sm">{msg}</p>
          </div>
        )}

        {state === "ok" && (
          <>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-harvest-500 text-white">
              <CheckCircle2 className="h-8 w-8" strokeWidth={2} />
            </div>
            <h1 className="font-display text-2xl font-semibold text-harvest-800">
              Compte activé !
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {msg}
            </p>
            <Link
              href="/login"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:-translate-y-0.5"
            >
              Se connecter
              <ArrowRight className="h-4 w-4" />
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-destructive/10 text-destructive">
              <XCircle className="h-8 w-8" strokeWidth={2} />
            </div>
            <h1 className="font-display text-2xl font-semibold">
              Lien invalide
            </h1>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
              {msg} Le lien a peut-être expiré ou déjà été utilisé.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold transition hover:bg-secondary"
              >
                Recommencer l&apos;inscription
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                Se connecter
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
