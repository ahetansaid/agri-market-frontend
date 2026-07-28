"use client";

import { useEffect, useRef, useState } from "react";
import { Globe, Check } from "lucide-react";
import { useT } from "@/lib/i18n/client";
import {
  LOCALES,
  LOCALE_COOKIE,
  LOCALE_META,
  type Locale,
} from "@/lib/i18n/messages";

export function LocaleSwitcher() {
  const { locale, t } = useT();
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node))
        setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (l: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${l};path=/;max-age=31536000;samesite=lax`;
    // Recharge pour re-rendre aussi les composants serveur avec la nouvelle langue.
    window.location.reload();
  };

  return (
    <div ref={boxRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t("lang.choose")}
        aria-expanded={open}
        className="flex items-center gap-1.5 rounded-full p-2.5 text-sand-600 transition hover:bg-secondary hover:text-brand-700"
      >
        <Globe className="h-5 w-5" strokeWidth={2} />
        <span className="text-xs font-bold uppercase tracking-wide">
          {LOCALE_META[locale].short}
        </span>
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-border bg-card py-1 shadow-2xl">
          {LOCALES.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => choose(l)}
              className={`flex w-full items-center justify-between gap-2 px-4 py-2.5 text-sm transition hover:bg-sand-50 ${
                l === locale ? "font-semibold text-brand-700" : "text-foreground/80"
              }`}
            >
              <span className="flex items-center gap-2.5">
                <span className="grid h-6 w-8 place-items-center rounded bg-secondary text-[11px] font-bold">
                  {LOCALE_META[l].short}
                </span>
                {LOCALE_META[l].label}
              </span>
              {l === locale && <Check className="h-4 w-4 text-brand-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
