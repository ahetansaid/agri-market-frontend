import Link from "next/link";
import {
  LayoutGrid,
  Sprout,
  PlusCircle,
  Users,
  Map,
  CalendarDays,
  Store,
  UserCircle,
} from "lucide-react";
import { getT } from "@/lib/i18n/server";

const ITEMS = [
  { icon: LayoutGrid, k: "qa.allListings", href: "/annonces" },
  { icon: Sprout, k: "qa.sectors", href: "/filieres" },
  { icon: PlusCircle, k: "qa.publish", href: "/annonces/nouvelle" },
  { icon: Users, k: "qa.producers", href: "/annonces" },
  { icon: Map, k: "qa.countries", href: "/pays" },
  { icon: CalendarDays, k: "qa.events", href: "/evenements" },
  { icon: Store, k: "qa.becomeSeller", href: "/register?type=seller" },
  { icon: UserCircle, k: "qa.myAccount", href: "/login" },
];

export async function QuickAccess() {
  const { t } = await getT();
  return (
    <section className="relative z-20 -mt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-1.5 rounded-3xl border border-border bg-card p-2.5 shadow-xl shadow-brand-900/5 sm:grid-cols-4 sm:gap-2 sm:p-3 lg:grid-cols-8">
          {ITEMS.map(({ icon: Icon, k, href }) => (
            <Link
              key={k}
              href={href}
              className="group flex flex-col items-center gap-2.5 rounded-2xl px-2 py-4 text-center transition hover:bg-brand-50"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-sm shadow-brand-600/20 transition group-hover:-translate-y-0.5 group-hover:shadow-md">
                <Icon className="h-5 w-5" strokeWidth={2} />
              </span>
              <span className="text-[13px] font-semibold leading-tight text-foreground/80 transition group-hover:text-brand-700">
                {t(k)}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
